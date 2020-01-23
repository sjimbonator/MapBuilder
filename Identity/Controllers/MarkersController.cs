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
    public class MarkersController : ApiController
    {
        private IdentityContext db = new IdentityContext();


        // GET: api/Markers/5
        public IQueryable<Marker> GetMarkers(int id)
        {
            return db.Markers.Where(layer => layer.LayerId == id);
        }
        [Authorize]
        // PUT: api/Markers/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutMarker(int id, Marker marker)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != marker.Id)
            {
                return BadRequest();
            }

            db.Entry(marker).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MarkerExists(id))
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
        // POST: api/Markers
        [ResponseType(typeof(Marker))]
        public async Task<IHttpActionResult> PostMarker(Marker marker)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Markers.Add(marker);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = marker.Id }, marker);
        }
        [Authorize]
        // DELETE: api/Markers/5
        [ResponseType(typeof(Marker))]
        public async Task<IHttpActionResult> DeleteMarker(int id)
        {
            Marker marker = await db.Markers.FindAsync(id);
            if (marker == null)
            {
                return NotFound();
            }

            db.Markers.Remove(marker);
            await db.SaveChangesAsync();

            return Ok(marker);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool MarkerExists(int id)
        {
            return db.Markers.Count(e => e.Id == id) > 0;
        }
    }
}