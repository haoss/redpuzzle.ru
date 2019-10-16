'use strict'

// Document ready
$(document).on('ready', function(){

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

  
  $(document).on('click', '.open-popup-link', function(e) {
    e.preventDefault();
    $.magnificPopup.open({
        items: {
            src: $(this).attr('href')
        },
        type: 'inline',
		showCloseBtn: false
    });
  });

  $('.open-popup-register').magnificPopup({
    type: 'inline',
    midClick: true,
    showCloseBtn: false,
    mainClass: 'mfp-bg-register'
  });
  $('.open-popup-register--inpopup').on('click', function(e){
    e.preventDefault();
    $.magnificPopup.close();
    setTimeout(function(){
      $.magnificPopup.open({
        items: {
          src: '#popup-register'
        },
        type: 'inline',
        midClick: true,
        showCloseBtn: false,
        mainClass: 'mfp-bg-register'
        // You may add options here, they're exactly the same as for $.fn.magnificPopup call
        // Note that some settings that rely on click event (like disableOn or midClick) will not work here
      }, 0);
    }, 400);
  });
  $('.open-popup-enter--inpopup').on('click', function(e){
    e.preventDefault();
    $.magnificPopup.close();
    setTimeout(function(){
      $.magnificPopup.open({
        items: {
          src: '#popup-enter'
        },
        type: 'inline',
        midClick: true,
        showCloseBtn: false,
        // You may add options here, they're exactly the same as for $.fn.magnificPopup call
        // Note that some settings that rely on click event (like disableOn or midClick) will not work here
      }, 0);
    }, 400);
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

  // Кастомный селект
  $('.selectric').selectric({
    // disableOnMobile: false,
    // nativeOnMobile: false
  });

  // Читать далее на мобильник
  readMore();
  // Липкая шапка при скролле
  headerScroll();
  // Блок о проекте к шапке
  navigationInfo();
  // Мобильное боковое меню
  menuMobile();

  // Адаптивная высота блоков
  $('.purchase__block .purchase__info').matchHeight();

  // Тест Избранное - удалить при сборке
  favoritesTest();
  // Слайдер вопрос-ответ
  faq();
  // Попап блок Сортировка
  sortingOption();
  // Папап телефон вакансии
  phoneVacancy();
  // Мобильная боковая колонка
  columnMobile();

  // Читать далее
  $('.has-hide').readmore({
    speed: 500,
    collapsedHeight: 295,
    moreLink: '<div class="filter__more"><a href="#!">показать все</a></div>',
    lessLink: '<div class="filter__more"><a href="#!">скрыть лишнее</a></div>'
  });

  // Прикрепление фото в профиле при создании резюме
  uploadImageProfile();

  $('.buy-top__row-center__wrapper').each(function(){
    var _this = $(this);
    _this.on('click', function() {
      if (_this.hasClass('is-active')) {
        _this.removeClass('is-active');
        _this.css({height: '101px', overflow: 'hidden'});
      } else {
        _this.addClass('is-active');
        _this.css({height: '100%', overflow: 'visible'});
      }
    });
  });

  $('.nice-select').niceSelect();

  animationBlock();
  animationLink();
  fixedMobileConBtn();

  // Datepicker
  $('#datepicker1').data('datepicker');

  $( "#datepicker2" ).datepicker({
    changeMonth: true,
    changeYear: true
  });

  $(".chosen-select").chosen({
    no_results_text: 'нет результата'
  });

  // simpleForm version 2015-09-23 14:30 GMT +2
  simpleForm('form.form-callback');
});

$(window).on('load', function() {
  // $(".loader_inner").fadeOut();
  $(".loader").delay(400).fadeOut("slow");
});

$(window).on('resize', function(){
  var width = $(window).width(),
      mobileColWrapper = $('.mobile__col-wrapper'),
      body = $('body'),
      mobileColBackground = $('.mobile__col-background'),
      navMobile = $('#mobile__nav'),
      navBackground = $('.mobile__nav-background');

  if (width > 767) {
    $('.message__readmore').removeClass('is-active');
    $('.message__link a').text('Развернуть');
  }
  if (width > 991 && $('#mobileColBtn').hasClass('is-fixed')) {
    $('#mobileColBtn').removeClass('is-fixed');
  }
  if (width > 767 && body.hasClass('overflow-hidden') && navBackground.hasClass('is-active') && navMobile.hasClass('is-active')) {
    body.removeClass('overflow-hidden');
    navBackground.removeClass('is-active');
    navMobile.removeClass('is-active');
  }

  if (width > 991 && body.hasClass('overflow-hidden') && mobileColBackground.hasClass('is-active') && mobileColWrapper.hasClass('is-active')) {
    body.removeClass('overflow-hidden');
    mobileColBackground.removeClass('is-active');
    mobileColWrapper.removeClass('is-active');
  }

  $('.has-hide').readmore({
    speed: 500,
    collapsedHeight: 295,
    moreLink: '<div class="filter__more"><a href="#!">показать все</a></div>',
    lessLink: '<div class="filter__more"><a href="#!">скрыть лишнее</a></div>'
  });

  columnMobile();
});

$(window).on('scroll', function(){
  headerScroll();
  fixedMobileConBtn();
});

/*
version 2015-09-23 14:30 GMT +2
*/
function simpleForm(form, callback) {
  $(document).on('submit', form, function(e){
    e.preventDefault();

    var formData = {},
        hasFile = false;

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
      headerLang = $('.header__lang');

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
      a = $('.header__lang li a');

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

function readMore(){
  var width = $(window).width();

  $('.message__link a').on('click', function(e){
    e.preventDefault();
    $('.message__readmore').toggleClass('is-active');

    if ($('.message__link a').text() == 'Развернуть') {
      $('.message__link a').text('Свернуть')
    } else {
      $('.message__link a').text('Развернуть')
    }
  });

}

function headerScroll(){
  var header = $('.header'),
      nav = $('.navigation'),
      width = $(window).width();

  if (width > 991 && $(window).scrollTop() > header.height()) {
    nav.addClass('is-sticky');
  } else {
    nav.removeClass('is-sticky');
  }
}

function navigationInfo(){
  var navAbout = $('.navigation__about'),
      navInfo = $('.navigation__info');

  navAbout.on('click', function(e){
    $(this).toggleClass('is-hover');
    navInfo.toggleClass('is-active');
  });

  navAbout.on('click', function(e){
    e.stopPropagation();
  });
  navInfo.on('click', function(e){
    e.stopPropagation();
  });

  $(document).on('click', function(){
    if (navAbout.hasClass('is-hover') && navInfo.hasClass('is-active')) {
      setTimeout(function(){
        navInfo.removeClass('is-active');
        navAbout.removeClass('is-hover');
      }, 500)
    }
  })
}

function menuMobile(){
  var navButton = $('#navigation__button'),
      navMobile = $('#mobile__nav'),
      navMobileButton = $('#mobile__nav-button'),
      body = $('body'),
      navBackground = $('.mobile__nav-background');

  navButton.on('click', function(){
    body.addClass('overflow-hidden');
    navMobile.addClass('is-active');
    navBackground.addClass('is-active');
  });

  navMobileButton.on('click', function(){
    body.removeClass('overflow-hidden');
    navMobile.removeClass('is-active');
    navBackground.removeClass('is-active');
  });

  navBackground.on('click', function(){
    body.removeClass('overflow-hidden');
    navMobile.removeClass('is-active');
    navBackground.removeClass('is-active');
  });
}

function favoritesTest(){
  $('.favorites__button').on('click', function(e){
    e.preventDefault();
    $(this).toggleClass('is-favorites');
  })
}

function faq(){
  var faqBlock = '.faq__block',
      faqBlockAnswer = $('.faq__block-answer'),
      faqBlockTitle = $('.faq__block-title');

  $(faqBlock).each(function(){
    var _this = $(this);
    if (_this.hasClass('is-active')) {
      _this.find('.faq__block-answer').show();
    }
  });

  faqBlockTitle.on('click', function(e){
    e.preventDefault();
    var _this = $(this);

    if (!_this.parents(faqBlock).hasClass('is-active')) {
      _this.parents(faqBlock).addClass('is-active');
      _this.next(faqBlockAnswer).slideDown();
    } else {
      _this.parents(faqBlock).removeClass('is-active');
      _this.next(faqBlockAnswer).slideUp();
    }
  });
}

function sortingOption(){
  $('.catalog__sorting-head').on('click', function(){
    $(this).parent().toggleClass('is-active');
  });
  $('.catalog__sorting-wrapper').on('click', function(e){
    e.stopPropagation();
  });
  $('.catalog__sorting-background').on('click', function(){
    $(this).parent().removeClass('is-active');
  });
}

function phoneVacancy(){
  $('.phone__vacancy-head').on('click', function(){
    $(this).parent().toggleClass('is-active');
  });
  $('.phone__vacancy-wrapper').on('click', function(e){
    e.stopPropagation();
  });
  $('.phone__vacancy-background').on('click', function(){
    $(this).parent().removeClass('is-active');
  });
}

function columnMobile(){
  var mobileColBtn = $('#mobileColBtn'),
      mobileColWrapper = $('.mobile__col-wrapper'),
      mobileColButton = $('#mobileColButton'),
      body = $('body'),
      mobileColBackground = $('.mobile__col-background'),
      width = $(window).width();

  mobileColBtn.on('click', function(){
    body.addClass('overflow-hidden');
    mobileColWrapper.addClass('is-active');
    mobileColBackground.addClass('is-active');

    if (width < 991 && $('#mobileColWrapperBody-div').children().length == 0) {
      $('#mobileColContent > div').clone().appendTo('#mobileColWrapperBody-div');

      $('.has-hide').readmore({
        speed: 500,
        collapsedHeight: 295,
        moreLink: '<div class="filter__more"><a href="#!">показать все</a></div>',
        lessLink: '<div class="filter__more"><a href="#!">скрыть лишнее</a></div>'
      });
    }
  });

  mobileColButton.on('click', function(){
    body.removeClass('overflow-hidden');
    mobileColWrapper.removeClass('is-active');
    mobileColBackground.removeClass('is-active');

    if (width < 991 && $('#mobileColWrapperBody-div').children().length) {
      $('#mobileColWrapperBody-div > div').remove();
    }
  });

  mobileColBackground.on('click', function(){
    body.removeClass('overflow-hidden');
    mobileColWrapper.removeClass('is-active');
    mobileColBackground.removeClass('is-active');

    if (width < 991 && $('#mobileColWrapperBody-div').children().length) {
      $('#mobileColWrapperBody-div > div').remove()
    }
  });

  if (width < 991 && $('#mobileColWrapperBody-div').children().length == 0) {
    $('#mobileColWrapperBody-div > div').remove();

    $('.has-hide').readmore({
      speed: 500,
      collapsedHeight: 295,
      moreLink: '<div class="filter__more"><a href="#!">показать все</a></div>',
      lessLink: '<div class="filter__more"><a href="#!">скрыть лишнее</a></div>'
    });
  }
}

function fixedMobileConBtn(){
  var btn = $('#mobileColBtn');
  var header = $('.header');
  var width = $(window).width();

  if (width < 991 && $(window).scrollTop() > header.height()) {
    btn.addClass('is-fixed');
  } else if (width > 991 ) {
    btn.removeClass('is-fixed');
  } else {
    btn.removeClass('is-fixed');
  }
}

function uploadImageProfile() {
  var readURL = function(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $('.settings__picture').attr('src', e.target.result);
      }

      reader.readAsDataURL(input.files[0]);
    }
  }

  $(".settings__file-upload").on('change', function(){
    readURL(this);
  });
  $(".settings__image-div").on('click', function() {
     $(".settings__file-upload").click();
  });
  $(".settings__file-link").on('click', function() {
     $(".settings__file-upload").click();
  });
}

;( function ( document, window, index )
{
	var inputs = document.querySelectorAll( '.inputfile' );
	Array.prototype.forEach.call( inputs, function( input )
	{
		var label	 = input.nextElementSibling,
			labelVal = label.innerHTML;

		input.addEventListener( 'change', function( e )
		{
			var fileName = '';
			if( this.files && this.files.length > 1 )
				fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
			else
				fileName = e.target.value.split( '\\' ).pop();

			if( fileName )
				label.querySelector( 'span' ).innerHTML = fileName;
			else
				label.innerHTML = labelVal;
		});

		// Firefox bug fix
		input.addEventListener( 'focus', function(){ input.classList.add( 'has-focus' ); });
		input.addEventListener( 'blur', function(){ input.classList.remove( 'has-focus' ); });
	});
}( document, window, 0 ));

function animationBlock(){

  var blockBody = $('.assistance__square');

  blockBody.each(function(){
    var tl = new TimelineLite();

    var _this = $(this);
    var one = _this.find('.assistance__square-one');
    var two = _this.find('.assistance__square-two');
    var three = _this.find('.assistance__square-three');
    var title = _this.find('.assistance__title');
    var info = _this.find('.assistance__info');
    var li = _this.find('.assistance__info li');
    var images = _this.find('.assistance__img');

    tl
      .set(one, {css:{zIndex: 15}})
      .set(two, {css:{zIndex: 5}})
      .set(title, {css:{color:'#444444'}})
      .to(one, 0.35, {css:{transform:"skewX(-15deg) translateX(17px) translateY(-17px)"}},'start0')
      .set(one, {css:{zIndex: 5}}, 'start1')
      .to(one, 0.35, {css:{transform:"skewX(-15deg) translateX(-17px) translateY(17px)"}}, 'start2')
      .to(two, 0.35, {css:{transform:"skewX(-15deg) translateX(-32px) translateY(32px)"}},'start0')
      .set(two, {css:{zIndex: 15}}, 'start1')
      .to(two, 0.35, {css:{transform:"skewX(-15deg) translateX(45px) translateY(-40px)"}}, 'start2')
      .to(info, 0.5, {width: 262,x:'-=131'})
      .to(info, 0.5, {height: 184,y:'-=60'}, 'start3')
      .to(title, 0.5, {y: '-115px'}, 'start3', "+=0.5")
      .set(title, {css:{color:'#1747a1'}})
      .staggerTo(li, 0.35, {css:{transform:"translateY(0)", opacity:1}}, 0.2)
      .set(images, {autoAlpha: 1})
      .set(images, {css:{zIndex: 40}})
    ;
    tl.pause();

    _this.hover(function(e){
      e.stopPropagation();
      tl.play();
    }, function(){
      tl.reverse();
    });

    // info.on('click', function(){
    //
    // });

    li.find('a').on('click', function(e){
      e.stopPropagation();
    })
  });

}

function animationLink(){

  $('.assistance__info li a').each(function(e){
    var _this = $(this);
    var tl = new TimelineLite({
      repeat: 1,
      onReverseComplete: function(){
        console.log('reverse complete');
        $('#' + _this.data('img') + ' img').attr('style','');
      }
    });

    if (!_this.data('img')) return;

    _this.hover(function(e){

      var img = $('#' + _this.data('img') + ' img');
      tl
        .staggerTo(img, 0.35, {autoAlpha: 1, y:'0'}, 0.1)
      ;
      tl.pause();
      tl.seek(0);
      tl.play();
    }, function(){
      tl.reverse();
    });
  })

}
