// Header-Section ***
$(document).ready(function () {
    // Navbar toggler and close button**
    $(".navbar-toggler").click(() => $(".navbar-nav").toggleClass("active"));
    $(".btn-nav-close").click(() => $(".navbar-nav").removeClass("active"));

    // Add icon to nav-item with a dropdown**
    $(".nav-item").has(".dropdown").addClass("icon");

    // Phone input logic**
    if ($("#phoneInput").length) console.log("Phone input detected.");

    // Mobile menu toggle**
    $("#hamburger").click(() => $("#mobile-menu").toggleClass("hidden"));

    // Dropdown toggle and close logic**
    $(".dropdown-toggle").click(function () {
        // Close all other dropdowns
        $(".dropdown").not($(this).next(".dropdown")).addClass("hidden");
        $(".dropdown-toggle i").not($(this).find("i")).removeClass("fa-sort-up").addClass("fa-sort-down");

        // Toggle the clicked dropdown
        const targetDropdown = $(this).next(".dropdown");
        targetDropdown.toggleClass("hidden");
        $(this).find("i").toggleClass("fa-sort-down fa-sort-up");
    });

    $(".dropdown a").click(function () {
        $(this).closest(".dropdown").addClass("hidden");
        $(this).closest("button").find("i").toggleClass("fa-sort-down fa-sort-up");
    });

    // Hide and show the top bar on scroll**
    let lastScrollY = window.scrollY;
    const topBar = $(".top-bar"); // Selector for the top bar
    const bottomBar = $(".bottom-bar"); // Selector for the bottom bar (remains sticky)

    $(window).on("scroll", function () {
        if (window.scrollY === 0) {
            // At the very top of the page
            topBar.css("transform", "translateY(0)");
        } else if (window.scrollY > lastScrollY) {
            // Scrolling down
            topBar.css("transform", "translateY(-100%)");
        } else {
            // Scrolling up
            topBar.css("transform", "translateY(0)");
        }
        lastScrollY = window.scrollY;
    });

    // Ensure bottom bar is always sticky
    bottomBar.css("position", "sticky").css("top", "0");

    // Modal functionality**
    const $modal = $("#quoteModal");
    const $openBtn = $("#requestQuoteBtn");
    const $closeBtn = $("#closeModalBtn");

    // Open Modal
    $openBtn.on("click", function (e) {
        e.preventDefault();
        $modal.removeClass("hidden");
    });

    // Close Modal
    $closeBtn.on("click", function () {
        $modal.addClass("hidden");
    });

    // Close Modal When Clicking Outside the Content
    $modal.on("click", function (e) {
        if (e.target === this) {
            $modal.addClass("hidden");
        }
    });
});



// Popup form -section ***
$(document).ready(function () {
    const modal = $("#quoteModal");
    const openBtns = $(".requestQuoteBtn");
    const closeBtn = $("#closeModalBtn");

    // Open Modal for each button
    openBtns.on("click", function (e) {
        e.preventDefault();
        modal.removeClass("hidden");
    });

    // Close Modal
    closeBtn.on("click", function () {
        modal.addClass("hidden");
    });

    // Close Modal When Clicking Outside the Content
    modal.on("click", function (e) {
        if ($(e.target).is(modal)) {
            modal.addClass("hidden");
        }
    });
});


// Form Validation - Captcha code generator ***
$(function () {
    // Captcha code generator for the first form
    const captchaCode1 = Array.from({ length: 6 }, () => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'[Math.floor(Math.random() * 62)]).join('');
    $('#captcha-text').text(captchaCode1);
    window.generatedCaptcha1 = captchaCode1;

    // Captcha code generator for the second form
    const captchaCode2 = Array.from({ length: 6 }, () => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'[Math.floor(Math.random() * 62)]).join('');
    $('#captcha-text-new').text(captchaCode2);
    window.generatedCaptcha2 = captchaCode2;

    // Form submission validation for the first form
    $('#contact-form').on('submit', function (e) {
        const userCaptcha1 = $('#captcha').val();
        if (userCaptcha1 !== window.generatedCaptcha1) {
            e.preventDefault();
            alert('Captcha for the first form is incorrect.');
        }
    });

    // Form submission validation for the second form
    $('#contact-form-new').on('submit', function (e) {
        const userCaptcha2 = $('#captcha-new').val();
        if (userCaptcha2 !== window.generatedCaptcha2) {
            e.preventDefault();
            alert('Captcha for the second form is incorrect.');
        }
    });
});


// Counter section ***
$(document).ready(function () {
    const animateCounters = () => {
        $('.counter').each(function () {
            const $this = $(this), target = +$this.data('target');
            let current = 0, increment = target / 100;
            const update = () => (current < target) ? $this.text(Math.ceil(current += increment)) && setTimeout(update, 20) : $this.text(target);
            update();
        });
    };

    const isVisible = () => {
        const rect = $('#counter-section')[0].getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom >= 0;
    };

    if (isVisible()) animateCounters();
    $(window).on('scroll', function () {
        if (isVisible()) {
            animateCounters();
            $(this).off('scroll');
        }
    });
});


// FAQ's section

$(document).ready(function () {
    const $faqItems = $(".faq-item");

    $faqItems.each(function (index) {
        const $this = $(this);
        const $heading = $this.find("h3");
        const $content = $this.find(".faq-content");
        const $plusIcon = $this.find(".plus-icon");

        // Keep the first item open by default
        if (index === 0) {
            $content.removeClass("hidden");
            $plusIcon.text("-");
        } else {
            $content.addClass("hidden");
            $plusIcon.text("+");
        }

        $heading.on("click", function () {
            // Close all other FAQ items
            $faqItems.each(function () {
                const $otherItem = $(this);
                if ($otherItem[0] !== $this[0]) {
                    $otherItem.find(".faq-content").addClass("hidden");
                    $otherItem.find(".plus-icon").text("+");
                }
            });

            // Toggle the clicked FAQ item
            if ($content.hasClass("hidden")) {
                $content.removeClass("hidden");
                $plusIcon.text("-");
            } else {
                $content.addClass("hidden");
                $plusIcon.text("+");
            }
        });
    });
});



