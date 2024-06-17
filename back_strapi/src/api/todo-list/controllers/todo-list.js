'use strict';

/**
 * todo-list controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::todo-list.todo-list');
