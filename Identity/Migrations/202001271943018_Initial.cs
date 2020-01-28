namespace Identity.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.MarkerStyles", "Height", c => c.Int(nullable: false));
            DropColumn("dbo.MarkerStyles", "Heigth");
        }
        
        public override void Down()
        {
            AddColumn("dbo.MarkerStyles", "Heigth", c => c.Int(nullable: false));
            DropColumn("dbo.MarkerStyles", "Height");
        }
    }
}
