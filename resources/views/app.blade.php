<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home - PizzaPort & Cafe</title>

    <!-- Favicon -->
    <link rel="icon" href="{{ asset('asset/image/Pizza-Port-Cafe-Logo.png') }}" type="image/png">

    <!-- Mobile Specific -->
    <meta name="viewport" content="width=device-width, initial-scale=1">


    <!-- Icons and Fonts -->
    <link rel="stylesheet" href="{{ asset('asset/icons/flaticon/flaticon_swigo.css') }}">
    <link rel="stylesheet" href="{{ asset('asset/icons/font-awesome/css/all.min.css') }}">
    <link rel="stylesheet" href="{{ asset('asset/icons/line-awesome/css/line-awesome.min.css') }}">
    <link rel="stylesheet" href="{{ asset('asset/icons/feather/css/iconfont.css') }}">

    <!-- Vendor Styles -->
    <link rel="stylesheet" href="{{ asset('asset/vendor/swiper/swiper-bundle.min.css') }}">
    <link rel="stylesheet" href="{{ asset('asset/vendor/niceselect/css/nice-select.css') }}">
    <link rel="stylesheet" href="{{ asset('asset/vendor/pickadate/lib/themes/default.css') }}">
    <link rel="stylesheet" href="{{ asset('asset/vendor/pickadate/lib/themes/default.date.css') }}">
    <link rel="stylesheet" href="{{ asset('asset/vendor/rangeslider/rangeslider.css') }}">
    <link rel="stylesheet" href="{{ asset('asset/vendor/switcher/switcher.css') }}">

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lobster&family=Lobster+Two:ital,wght@0,400;0,700;1,400;1,700&family=Poppins:ital,wght@0,100;0,200;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">

    <!-- Custom Stylesheet -->
    <link rel="stylesheet" href="{{ asset('asset/css/style.css') }}">
    <link rel="stylesheet" href="{{ asset('asset/vendor/switcher/switcher.css') }}">
    <link rel="stylesheet" href="{{ asset('asset/vendor/rangeslider/rangeslider.css') }}">

    <link rel="stylesheet" href="{{ asset('asset/css/custom.css') }}">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">


    <!-- Vite and Inertia -->
    @viteReactRefresh
    @vite(['resources/js/app.jsx', 'resources/css/style.css'])
    @inertiaHead
</head>

<body id="bg" class="box-border m-0 selection:bg-primary selection:text-white font-poppins">

    <!-- Loader -->
    <!-- <div id="loading-area" class="loading-page-3 fixed top-0 left-0 w-full h-full z-[999999999] flex items-center justify-center bg-white">
        <img src="{{ asset('asset/images/loading.gif') }}" alt="Loading">
    </div> -->

    <!-- Pointer ring -->
    <div id="cursor" class="sm:block hidden"></div>
    <div id="cursor-border" class="sm:block hidden"></div>

    <!-- Scrolltop Progress -->
    <div class="progress-wrap">
        <svg class="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
            <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
        </svg>
    </div>

    <div class="page-wraper">
        @inertia
    </div>

    <div class="menu-backdrop"></div>

    <!-- JavaScript Files -->
    <script src="{{ asset('asset/js/jquery.min.js') }}"></script>
    <script src="{{ asset('asset/vendor/niceselect/js/jquery.nice-select.min.js') }}"></script>
    <script src="{{ asset('asset/vendor/swiper/swiper-bundle.min.js') }}"></script>
    <script src="{{ asset('asset/vendor/pickadate/lib/picker.js') }}"></script>
    <script src="{{ asset('asset/vendor/pickadate/lib/picker.date.js') }}"></script>
    <script src="{{ asset('asset/vendor/pickadate/lib/picker.time.js') }}"></script>
    <script src="{{ asset('asset/js/dz.ajax.js') }}"></script>
    <script src="{{ asset('asset/js/dz.carousel.js') }}"></script>
    <script src="{{ asset('asset/js/custom.min.js') }}"></script>
    <script src="{{ asset('asset/vendor/rangeslider/rangeslider.js') }}"></script>
    <script src="{{ asset('asset/js/dznav-init.js') }}"></script>
    <!-- <script src="{{ asset('asset/vendor/switcher/switcher.js') }}"></script> -->
    <script src="{{ asset('asset/vendor/masonry/masonry-4.2.2.js') }}"></script>
    <script src="{{ asset('asset/vendor/masonry/isotope.pkgd.min.js') }}"></script>
    <script src="{{ asset('asset/vendor/nouislider/nouislider.min.js') }}"></script>
    <script src="{{ asset('asset/vendor/wnumb/wNumb.js') }}"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <!-- <script src="{{ asset('asset/js/av_alert.js') }}"></script> -->

    <!-- External JavaScript -->
    <script src="https://www.google.com/recaptcha/api.js"></script> <!-- Google API for Recaptcha -->


</body>

</html>