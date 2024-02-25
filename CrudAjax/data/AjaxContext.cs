using CrudAjax.Models;
using CrudAjaxPRACTICE.Models;
using Microsoft.EntityFrameworkCore;

namespace CrudAjax.data
{
    public class AjaxContext:DbContext

    {
        public AjaxContext(DbContextOptions<AjaxContext>options):base(options)
        {
            
        }

        public DbSet<Employee>Employees { get; set; }
        public DbSet<Country> countries { get; set; }
        public DbSet<State> states  { get; set; }
        public DbSet<City> cities { get; set; }
    }
}
