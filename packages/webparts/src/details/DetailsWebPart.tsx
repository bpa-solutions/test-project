import { Details, IDetailsProps } from '@bpa/components-details';
import { IState, createStore } from '@bpa/core-redux';
import { setup } from '@bpa/core-services';
import { Version } from '@microsoft/sp-core-library';
import { type IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Provider } from 'react-redux';

export interface IDetailsWebPartProps {
  listName: string;
}

export default class DetailsWebPart extends BaseClientSideWebPart<IDetailsWebPartProps> {
  protected store: any;

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [
            {
              groupFields: [
                PropertyPaneTextField('listName', {
                  label: 'List Name'
                })
              ]
            }
          ]
        }
      ]
    };
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected async onInit(): Promise<void> {
    setup(this.context);
    this.store = createStore<IState>({
      storeName: `Details`
    });
  }

  public render(): void {
    const element: React.ReactElement<IDetailsProps> = React.createElement(Details, {
      listName: this.properties.listName
    });

    ReactDom.render(
      <React.Suspense fallback={''}>
        <Provider store={this.store}>{element}</Provider>
      </React.Suspense>,
      this.domElement
    );
  }
}
