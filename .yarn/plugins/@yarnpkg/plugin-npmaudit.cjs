const { once } = require('events');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

module.exports = {
  name: `plugin-npmaudit`,
  factory: (require) => {
    const { BaseCommand } = require(`@yarnpkg/cli`);
    const { Configuration, Project, httpUtils, structUtils, treeUtils } = require(`@yarnpkg/core`);

    class NpmAuditCommand extends BaseCommand {
      static paths = [[`npmaudit`]];

      async execute() {
        const configuration = await Configuration.find(this.context.cwd, this.context.plugins);
        const { project, workspace } = await Project.find(configuration, this.context.cwd);

        if (!workspace) {
          throw new WorkspaceRequiredError(project.cwd, this.context.cwd);
        }

        await project.restoreInstallState();

        const request = {};
        let dependenciesCount = 0;
        const putResolution = (name, version) => {
          const versions = request[name] ?? [];
          if (versions.length === 0) {
            request[name] = versions;
          }
          versions.push(version);
          dependenciesCount++;
        };

        for (const pkg of project.storedPackages.values()) {
          const { reference, version } = pkg;
          if (reference.startsWith('npm:')) {
            putResolution(structUtils.stringifyIdent(pkg), version);
          }
        }

        const vulnerableDependencies = await httpUtils.post('https://registry.npmjs.org/-/npm/v1/security/advisories/bulk', request, {
          configuration,
          jsonResponse: true
        });

        const vulnerableDependenciesCount = Object.keys(vulnerableDependencies).length;
        const report = {
          vulnerableDependencies,
          vulnerableDependenciesCount,
          dependenciesCount
        };

        //this.context.stdout.write('result');
        //this.context.stdout.write(JSON.stringify(report, undefined, 2));
        if (!fs.existsSync(path.resolve(__dirname, '..', '..', '..', 'temp'))) {
          fs.mkdirSync(path.resolve(__dirname, '..', '..', '..', 'temp'));
        }
        fs.writeFileSync(path.resolve(__dirname, '..', '..', '..', 'temp', 'audit.json'), JSON.stringify(report, undefined, 2));

        const lastIndex = Object.keys(report.vulnerableDependencies).length - 1;
        Object.keys(report.vulnerableDependencies).forEach((key, index) => {
          const prefix = lastIndex === index ? '   ' : '│  ';
          if (lastIndex === index) {
            console.log(`└─ ${key}`);
          } else {
            console.log(`├─ ${key}`);
          }

          report.vulnerableDependencies[key].forEach((error) => {
            console.log(`${prefix}├─ Issue:`, error.title);
            console.log(`${prefix}├─ URL:`, error.url);
            console.log(`${prefix}├─ Severity:`, error.severity);
            console.log(`${prefix}└─ Vulnerable Versions:`, error.vulnerable_versions);
            console.log(`${prefix}`);
          });
        });

        return vulnerableDependenciesCount === 0 ? 0 : 1;
      }
    }

    // NpmAuditCommand.addPath('npmaudit');

    return {
      commands: [NpmAuditCommand]
    };
  }
};
