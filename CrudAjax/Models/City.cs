using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CrudAjaxPRACTICE.Models
{
    public class City
    {

        [Key]
        public int Id { get; set; }
        public string Name { get; set; } = default;

        //[ForeignKey("State")]
        //public int StateId { get; set; }

       // public State state { get; set; } = default;
        public State state { get; set; }
    }
}
