
$(document).ready(function(){
        $('delete-btn').on('click', function() {
    console.log('clicked delete button to', 'todos/'+$(this).attr('data-id'));
    $.ajax({
      method: 'DELETE',
      url: '/todos/:id'+$(this).attr('data-id'),
      success: window.location.href='/'
    });
  });
});