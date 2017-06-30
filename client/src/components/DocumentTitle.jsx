import React from 'react';
import PropTypes from 'prop-types';

const DocumentTitle = ({children}) => {
  if(document){
    document.title = children || '';
  }
  DocumentTitle.title = children || '';

  return null;
};

DocumentTitle.propTypes = {
  children: PropTypes.string
};

export default DocumentTitle;