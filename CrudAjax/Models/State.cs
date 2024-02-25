using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CrudAjaxPRACTICE.Models
{
    public class State
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } = default;

        //[ForeignKey("Country")]
        //public int CountryId { get; set; }

        //public Country Country { get; set; } = default;
        public Country Country { get; set; }
    }
}
