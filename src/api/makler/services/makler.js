'use strict';

/**
 * makler service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::makler.makler');
