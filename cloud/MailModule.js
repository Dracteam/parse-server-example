/**
 * Sample Mailgun Cloud Module
 * @name Mailgun
 * @namespace
 *
 * Sample Cloud Module for using <a href="http://www.mailgun.com">Mailgun</a>.
 *
 * <ul><li>Module Version: 1.0.0</li>
 * <li>Mailgun API Version: 'v2'</li></ul>
 *
 * Copyright (c) 2013-present, Parse, LLC.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

(function() {

  var url = 'api.mailgun.net/v2';
  var domain = '';
  var key = '';

  module.exports = {

    version: '1.0.0',

    initialize: function(domainName, apiKey) {
      domain = domain;
      key = apiKey;
      return this;
    },

    sendEmail: function(params, options) {
      return Parse.Cloud.httpRequest({
        method: "POST",
        url: "https://api:" + key + "@" + url + "/" + domain + "/messages",
        body: params,
      }).then(function(httpResponse) {
        if (options && options.success) {
          options.success(httpResponse);
        } }, function(httpResponse) {
        if (options && options.error) {
          options.error(httpResponse);
        }  });}}});
