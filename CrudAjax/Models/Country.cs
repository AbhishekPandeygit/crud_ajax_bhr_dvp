using System.ComponentModel.DataAnnotations;

namespace CrudAjaxPRACTICE.Models
{
    public class Country
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } = default;
    }
}
