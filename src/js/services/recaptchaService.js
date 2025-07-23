
export function verifyRecaptchaOnce() {
    return new Promise(function(resolve, reject) {
      if (!window.grecaptcha) {
        return reject(new Error('reCAPTCHA library not loaded.'));
      }
      window.grecaptcha.ready(function() {
        var widgetId = window.grecaptcha.render('recaptcha-container', {
          sitekey: import.meta.env.VITE_RECAPTCHA_SITE_KEY,
          size: 'invisible',
          callback: function(token) { resolve(token); },
          'error-callback': function() { reject(new Error('reCAPTCHA error')); }
        });
        window.grecaptcha.execute(widgetId);
      });
    });
}

export async function initRecaptcha() {
    try {
      var token = await verifyRecaptchaOnce();
      console.log('recaptcha success');
    } catch (err) {
      console.error('reCAPTCHA failed:');
    }
}
  