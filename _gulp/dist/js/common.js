'use strict'

// Document ready
$(document).on('ready', function(){

  // SVG Fallback
  if(!Modernizr.svg) {
    $("img[src*='svg']").attr("src", function() {
      return $(this).attr("src").replace(".svg", ".png");
    });
  };

  // Magnific popup gallery
  $('.gallery').each(function() {
    $(this).magnificPopup({
      delegate: '.gallery-item',
      type: 'image',
      gallery:{
        enabled:true
      },
      zoom: {
        enabled: true, // By default it's false, so don't forget to enable it

        duration: 300, // duration of the effect, in milliseconds
        easing: 'ease-in-out', // CSS transition easing function

        // The "opener" function should return the element from which popup will be zoomed in
        // and to which popup will be scaled down
        // By defailt it looks for an image tag:
        opener: function(openerElement) {
          // openerElement is the element on which popup was initialized, in this case its <a> tag
          // you don't need to add "opener" option if this code matches your needs, it's defailt one.
          return openerElement.is('img') ? openerElement : openerElement.find('img');
        }
      }
    });
  });

  // Magnific popup one image
  $('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    mainClass: 'mfp-img-mobile',
    image: {
      verticalFit: true
    }
  });

  // Magnific popup video
  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
  });

  $('.open-popup-link').magnificPopup({
    type: 'inline',
    midClick: true,
    showCloseBtn: false
  });

  $('.popup__close').on('click', function(){
    $.magnificPopup.close();
  });

  // Телефон и языки -активация блоков
  headerLinks();
  // Тест переключения языков - удалить при сборке
  languageTest();
  // Фокус поля ввода на кастомном поле
  searchFocus();

  $('.selectric').selectric();

  // Chrome Smooth Scroll
  try {
    $.browserSelector();
    if($("html").hasClass("chrome")) {
      $.smoothScroll();
    }
  } catch(err) {

  };

  // simpleForm version 2015-09-23 14:30 GMT +2
  simpleForm('form.form-callback');
});

$(window).on('load', function() {
  // $(".loader_inner").fadeOut();
  $(".loader").delay(400).fadeOut("slow");
});

/*
version 2015-09-23 14:30 GMT +2
*/
function simpleForm(form, callback) {
  $(document).on('submit', form, function(e){
    e.preventDefault();

    var formData = {};

    var hasFile = false;

    if ($(this).find('[type=file]').length < 1) {
      formData = $(this).serialize();
    }
    else {
      formData = new FormData();
      $(this).find('[name]').each(function(){

        switch($(this).prop('type')) {

          case 'file':
            if ($(this)[0]['files'].length > 0) {
              formData.append($(this).prop('name'), $(this)[0]['files'][0]);
              hasFile = true;
            }
            break;

          case 'radio':
          case 'checkbox':
            if (!$(this).prop('checked')) {
              break;
            }
            formData.append($(this).prop('name'), $(this).val().toString());
            break;

          default:
            formData.append($(this).prop('name'), $(this).val().toString());
            break;
        }
      });
    }

    $.ajax({
      url: $(this).prop('action'),
      data: formData,
      type: 'POST',
      contentType : hasFile ? 'multipart/form-data' : 'application/x-www-form-urlencoded',
      cache       : false,
      processData : false,
      success: function(response) {
        $(form).removeClass('ajax-waiting');
        $(form).html($(response).find(form).html());

        if (typeof callback === 'function') {
          callback(response);
        }
      }
    });

    $(form).addClass('ajax-waiting');

    return false;
  });
}

function headerLinks(){
  var headerPhone = $('.header__phone'),
      headerLang = $('.header__lang')
  ;

  // header
  headerPhone.on('click', function(e){
    e.stopPropagation();
    $(this).toggleClass('is-active');
    headerLang.removeClass('is-active');
  });
  headerLang.on('click', function(e){
    e.stopPropagation();
    $(this).toggleClass('is-active');
    headerPhone.removeClass('is-active');
  });

  $(document).on('click', function(){

    if (headerPhone.hasClass('is-active')) {
      setTimeout(function(){
        headerPhone.removeClass('is-active');
      }, 500)
    }
    if (headerLang.hasClass('is-active')) {
      setTimeout(function(){
        headerLang.removeClass('is-active');
      }, 500)
    }

  });
}

function languageTest(){
  var str = $('.header__lang-str'),
      li = $('.header__lang li'),
      a = $('.header__lang li a')
  ;

  li.on('click', function(e){
    e.stopPropagation();
    str.html(e.target.text + '<i class="ion-ios-arrow-down"></i>');
    li.removeClass('active');
    $(this).addClass('active');
    $('.header__lang').removeClass('is-active');
  });
}

function searchFocus(){
  $('.input-focus').each(function(){
    var _this = $(this);
    _this.focus(function() {
      _this.parents('.block-focus').addClass('is-focus');
    }).blur(function() {
      if (!_this.val().length > 0) {
        _this.parents('.block-focus').removeClass('is-focus');
      }
    });
  })

}
