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
    public class MarkerStylesController : ApiController
    {
        private IdentityContext db = new IdentityContext();

        // GET: api/MarkerStyles/5
        public IQueryable<MarkerStyle> GetMarkerStyle(int id)
        {
            return db.MarkerStyles.Where(marker => marker.MapId == id);
        }

        // PUT: api/MarkerStyles/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutMarkerStyle(int id, MarkerStyle markerStyle)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != markerStyle.Id)
            {
                return BadRequest();
            }

            db.Entry(markerStyle).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MarkerStyleExists(id))
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

        // POST: api/MarkerStyles
        [ResponseType(typeof(MarkerStyle))]
        public async Task<IHttpActionResult> PostMarkerStyle(MarkerStyle markerStyle)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.MarkerStyles.Add(markerStyle);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = markerStyle.Id }, markerStyle);
        }

        // DELETE: api/MarkerStyles/5
        [ResponseType(typeof(MarkerStyle))]
        public async Task<IHttpActionResult> DeleteMarkerStyle(int id)
        {
            MarkerStyle markerStyle = await db.MarkerStyles.FindAsync(id);
            if (markerStyle == null)
            {
                return NotFound();
            }

            db.MarkerStyles.Remove(markerStyle);
            await db.SaveChangesAsync();

            return Ok(markerStyle);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool MarkerStyleExists(int id)
        {
            return db.MarkerStyles.Count(e => e.Id == id) > 0;
        }
    }
}