using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using Identity.Data;
using Identity.Models;

namespace Identity.Controllers
{
    public class LayersController : ApiController
    {
        private IdentityContext db = new IdentityContext();

        // GET: api/Layers/5
        public IQueryable<Layer> GetLayers(int id) // Gets all layers of a specific map
        {
            return db.Layers.Where(layer => layer.MapId == id);
        }

        [Authorize]
        // PUT: api/Layers/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutLayer(int id, Layer layer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != layer.Id)
            {
                return BadRequest();
            }

            db.Entry(layer).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LayerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        [Authorize]
        // POST: api/Layers
        [ResponseType(typeof(Layer))]
        public async Task<IHttpActionResult> PostLayer(Layer layer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Layers.Add(layer);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = layer.Id }, layer);
        }

        [Authorize]
        // DELETE: api/Layers/5
        [ResponseType(typeof(Layer))]
        public async Task<IHttpActionResult> DeleteLayer(int id)
        {
            Layer layer = await db.Layers.FindAsync(id);
            if (layer == null)
            {
                return NotFound();
            }

            db.Layers.Remove(layer);
            await db.SaveChangesAsync();

            return Ok(layer);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool LayerExists(int id)
        {
            return db.Layers.Count(e => e.Id == id) > 0;
        }
    }
}