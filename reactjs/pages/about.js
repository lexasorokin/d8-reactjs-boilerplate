import React from 'react';
import PageWithContext from '../components/PageWithContext';
import DefaultLayout from '../components/Layouts';
import HtmlHead from '../components/HtmlHead';

export default class extends PageWithContext {
  render() {
    return (
      <DefaultLayout>
        <HtmlHead
          pageTitle="About us"
          metaDescription="Page meta description"
          metaKeywords="Page meta keywords"
        />
        <div>
          About us page content.
        </div>
      </DefaultLayout>
    );
  }
}
