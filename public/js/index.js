$(document).ready(function () {

  titulo = $('.csvTitulo').text()
  $('#myTable').dataTable({
      "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
      dom: 'Blfrtip',
      buttons: [
          {
              extend: 'copyHtml5',
              title: titulo
          },
          {
              extend: 'csvHtml5',
              title: titulo
          }
      ]
  });
});

$("#menu-toggle").click(function (e) {
  e.preventDefault();
  $("#wrapper").toggleClass("toggled");
});








