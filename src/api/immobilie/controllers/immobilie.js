'use strict';

/**
 * immobilie controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::immobilie.immobilie' , ({ strapi }) => ({
    // Method 3: Replacing a core action
      async create(ctx) {        
        // 1. Get user Id
        // Wenn Controller files erwartet muss er überschrieben werden mit dem Feldnamen, dass die Bilder bekommen soll. Siehe unten im create
        const files = ctx.request.files
        console.log("🚀 ~ file: immobilie.js:15 ~ create ~ files", files)
        const { id: userId } = ctx.state.user;
       

        // Get user field in Makler Table 
   
        const makler = await strapi.db.query('api::makler.makler').findOne({
            select: ["id"],
            where: { user: userId}
          });
        
          if (!makler) {
            return ctx.throw(404, 'Makler not found');
          }


          if (!ctx.request.body) 
          return ctx.throw(400, 'No body provided');

        

        // 2. Get body
        const { data } = ctx.request.body
        const parsedData = JSON.parse(data)
        console.log("🚀 ~ file: immobilie.js:36 ~ create ~ data", data)

        // 3. Create entity       
        const mergeBodyWithMakler = {
            ...parsedData,
            makler: makler.id
        }
        console.log("🚀 ~ file: immobilie.js:21 ~ create ~ mergeBodyWithMakler", mergeBodyWithMakler)
        

    const entity = await strapi.service('api::immobilie.immobilie').create(
      {
        data: mergeBodyWithMakler,        
        files: {
          file: files['files.bilder']
        }
      },



    );


        // 4. Sanitize entity
        const sanitizedEntity = await this.sanitizeOutput(entity, ctx);    
        return this.transformResponse(sanitizedEntity);
      },

      // async update(ctx) {
      //   console.log("ctx.req", ctx.req.body, ctx.req.headers, ctx.req.fil)
      //   // call normal behaviour via super
      //   const { data, meta } = await super.find(ctx);
      //   return { data, meta };


      // }
    }));
    
