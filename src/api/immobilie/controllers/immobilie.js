'use strict';

/**
 * immobilie controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::immobilie.immobilie' , ({ strapi }) => ({
    // Method 3: Replacing a core action
      async create(ctx) {
        // 1. Get user Id
        const { id: userId } = ctx.state.user;
        console.log("🚀 ~ file: immobilie.js:14 ~ create ~ userId", userId)

        // Get user field in Makler Table 
   
        const makler = await strapi.db.query('api::makler.makler').findOne({
            select: ["id"],
            where: { user: userId}
          });
        
          if (!makler) {
            return ctx.throw(404, 'Makler not found');
          }

        

        // 2. Get body
        const { data } = ctx.request.body;

        // 3. Create entity       
        const mergeBodyWithMakler = {
            ...data,
            makler: makler.id
        }
        console.log("🚀 ~ file: immobilie.js:21 ~ create ~ mergeBodyWithMakler", mergeBodyWithMakler)
        

        const entity = await strapi.service('api::immobilie.immobilie').create({data: mergeBodyWithMakler});


        // 4. Sanitize entity
        const sanitizedEntity = await this.sanitizeOutput(entity, ctx);    
        return this.transformResponse(sanitizedEntity);
      },
    }));
    
