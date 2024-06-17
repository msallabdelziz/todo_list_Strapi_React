'use strict';

/**
 * todo-list service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::todo-list.todo-list');
