import React from 'react';
import PageWithContext from '../components/PageWithContext';
import DefaultLayout from '../components/Layouts';
import HtmlHead from '../components/HtmlHead';

export default class extends PageWithContext {
  render() {
    return (
      <DefaultLayout>
        <HtmlHead
          pageTitle="Home page"
          metaDescription="Page meta description"
          metaKeywords="Page meta keywords"
        />
        <div>
          Index page content.
        </div>
      </DefaultLayout>
    );
  }
}
