import { Helper } from '@bpa/components-helper';
import { BaseApplicationCustomizer, PlaceholderContent, PlaceholderName } from '@microsoft/sp-application-base';
import { Log } from '@microsoft/sp-core-library';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

const LOG_SOURCE: string = 'HelperApplicationCustomizer';

/** A Custom Action which can be run during execution of a Client Side Application */
export default class HelperApplicationCustomizer extends BaseApplicationCustomizer<void> {
  protected container: DocumentFragment | Element;
  private static _footerPlaceholder: PlaceholderContent;

  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized BPA Helper`);

    if (!this.container) {
      HelperApplicationCustomizer._footerPlaceholder = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Bottom, {
        onDispose: this.onDispose
      }) as PlaceholderContent;
    }
    this.container = HelperApplicationCustomizer._footerPlaceholder.domElement;

    ReactDOM.render(
      <React.Suspense fallback={''}>
        <Helper />
      </React.Suspense>,
      this.container
    );

    return Promise.resolve();
  }
}
