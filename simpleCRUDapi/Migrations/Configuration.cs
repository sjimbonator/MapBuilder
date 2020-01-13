namespace simpleCRUDapi.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using simpleCRUDapi.Models;

    internal sealed class Configuration : DbMigrationsConfiguration<simpleCRUDapi.Data.simpleCRUDapiContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(simpleCRUDapi.Data.simpleCRUDapiContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //
            context.Maps.AddOrUpdate(x => x.Id,
                new Map() { Id = 1, Name = "Jane Austen" },
                new Map() { Id = 2, Name = "Charles Dickens" },
                new Map() { Id = 3, Name = "Miguel de Cervantes" }
        );
        }
    }
}
