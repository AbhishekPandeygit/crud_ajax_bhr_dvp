using CrudAjax.data;
using CrudAjax.Models;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace CrudAjax.Controllers
{
    public class EmployeeController : Controller
    {
        private readonly AjaxContext db;

        public EmployeeController(AjaxContext db)
        {
            this.db = db;
        }
        public IActionResult Index()
        {

            return View();
        }

        public JsonResult GetEmployee()
        {
            var data = db.Employees.ToList();

            return new JsonResult(data);
        }

        public JsonResult Delete(int id)
        {
            var data = db.Employees.Where(e => e.Id==id).SingleOrDefault();
            db.Employees.Remove(data);
            db.SaveChanges();

            return new JsonResult("data deleted");
        }

        public JsonResult Edit(int id)
        {
            var data = db.Employees.Where(e => e.Id == id).SingleOrDefault();

            return new JsonResult(data);
        }

        public JsonResult AddEmployee(Employee employee)
        {

            var emp = new Employee()
            {
                
                Name = employee.Name,
                Mobile = employee.Mobile,
                Dep = employee.Dep,
                Email = employee.Email
            };

            db.Employees.Add(emp);
            db.SaveChanges();
            return new JsonResult("data inserted");
        }

        [HttpPost]
        public JsonResult Update(Employee employee)
        {

            db.Employees.Update(employee);
            db.SaveChanges();
            return new JsonResult("Record updated");
        }

        public JsonResult Country()
        {
            var data = db.countries.ToList();

            return new JsonResult(data);
        }

        public JsonResult State(int id)
        {
            var data = db.states.Where(e => e.Country.Id == id).ToList();

            return new JsonResult(data);
        }

        public JsonResult City(int id)
        {
            var data = db.cities.Where(e => e.state.Id == id).ToList();

            return new JsonResult(data);
        }

    }
}
