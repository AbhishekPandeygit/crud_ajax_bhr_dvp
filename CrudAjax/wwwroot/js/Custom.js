$(document).ready(function () {

   
    ShowEmployeeData();
   

});

function ShowEmployeeData() {
    $.get("/Employee/GetEmployee", function (response) {
        $('#tbl_employee').DataTable({

            data: response,
            columns: [
                { "data": "id" },
                { "data": "name" },
                { "data": "email" },
                { "data": "mobile" },
                { "data": "dep" },
                {
                    "data": "id", class: "text-center", render: function (id) {
                        var link = "<a class='btn btn-danger' onclick='Delete(" + id + ")'>"
                        link += "<a onclick='Edit(" + id + ")'>"
                        return link
                    }
                }


            ]

        })

    })
    
}

$("#btnAddEmployee").click(function () {

    ClearTextBox();
    $("#EmployeeModal").modal('show');
    GetCountry();
    $('#State').attr('disabled', true);
    $('#City').attr('disabled', true);
    $('#Country').change(function () {
        $('#State').attr('disabled', false);
        var id = $(this).val();
        $('#State').empty();
        $('#State').append('<option> ---Select State ---</option>');
        $.ajax({
            url: '/Employee/State?id=' + id,
            success: function (result) {
                $.each(result, function (index, item) {
                    $('#State').append('<option value=' + item.id + '>' + item.name + '</option> ');
                })
            }

        })


    })


    $("#empId").hide();
    $('#AddEmployee').css('display', 'block');
    $('#btnUpdate').css('display', 'none');
    $('#employeeHeading').text('Add Employee');

    ShowEmployeeData()

    ClearTextBox()

    HideModalPopUp()
    ShowEmployeeData()



})


$('#State').change(function () {
    $('#City').attr('disabled', false);
    var id = $(this).val();
    $('#City').empty();
    $('#City').append('<option> ---Select City ---</option>');
    $.ajax({
        url: '/Employee/City?id=' + id,
        success: function (result) {
            $.each(result, function (index, item) {
                $('#City').append('<option value=' + item.id + '>' + item.name + '</option> ');
            })
        }

    })


})

function HideModalPopUp() {
    $('#EmployeeModal').modal('hide');
}

function ClearTextBox() {
    $("#txtName").val('');
    $("#txtEmail").val('');
    $("#txtMobile").val('');
    $("#txtDep").val('');
    $("#EmployeeId").val('');
}
function Delete(id) {

    if (confirm('Are you sure , you want to delete this record?')) {
        $.ajax({
            url: '/Employee/Delete?id=' + id,
            success: function () {
                alert('Record deleted');
                ShowEmployeeData();
            },

            error: function () {
                alert('Record not deleted')
            }
        })
    }

}

function Edit(id) {

    
        $.ajax({
            url: "/Employee/Edit?id=" + id,
            dataType: "json",
            type: "get",
            success: function (response) {
                $('#EmployeeModal').modal('show');
                $('#EmployeeId').val(response.id);
                $('#txtName').val(response.name);
                $('#txtEmail').val(response.email);
                $('#txtMobile').val(response.mobile);
                $('#txtDep').val(response.dep);
                $('#AddEmployee').css('display', 'none');
                $('#btnUpdate').css('display', 'block');
                $('#employeeHeading').text('Update Record');
            },
            error: function () {
                alert('data not edited')
            }
        })
}


function AddEmployee() {
    //{debugger
    var employee = {
        "Name": $("#txtName").val(),
        "Email": $("#txtEmail").val(),
        "Mobile": $("#txtMobile").val(),
        "Dep": $("#txtDep").val()
    }
    $.ajax({
        url: '/Employee/AddEmployee',
        method: 'POST',
        data: employee,
        dataType: 'json',
        success: function () {
            alert("data is inserted");
            ClearTextBox()
            ShowEmployeeData();
            HideModalPopUp();
        },
        error: function () {
            alert("data is not inserted")
        }
    });

}

function UpdateEmployee() {
    //{debugger
    var employee = {
        "Id": $("#EmployeeId").val(),
        "Name": $("#txtName").val(),
        "Email": $("#txtEmail").val(),
        "Mobile": $("#txtMobile").val(),
        "Dep": $("#txtDep").val()
    }
    $.ajax({
        url: '/Employee/Update',
        method: 'POST',
        data: employee,
        dataType: 'json',
        success: function () {
            alert("data saved");
            ClearTextBox()
            ShowEmployeeData();
            HideModalPopUp();
        },
        error: function () {
            alert("data cant be saved")
        }
    });

}

function GetCountry(){

    $.ajax({
        url: "/Employee/Country",
        //dataType: "json",
        //method: "GET",
        success: function(response) {
            $.each(response, function(index, item) {
                $('#Country').append('<Option value=' + item.id + '>' + item.name + '</Option>')
            })
        },
        error: function () {
            alert('data cant be get')
        }
    })
}