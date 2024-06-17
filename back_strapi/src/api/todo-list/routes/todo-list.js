'use strict';

/**
 * todo-list router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::todo-list.todo-list');
