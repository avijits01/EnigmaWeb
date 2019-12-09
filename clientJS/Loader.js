function showLoader() {
  $(".SubmissionLoader").show();

  $(".error").hide();
  $(".status-text-sub").hide();
  $(".success").hide();

  $(".loader-container").show();
  $(".status-text").text("Form Submitting");
}

function showSuccess() {
  $(".loader-container").hide();
  $(".error").hide();
  $(".status-text-sub").hide();

  $(".success").show();
  $(".status-text").text("Form Submitted!");
}

function showError() {
  $(".loader-container").hide();
  $(".success").hide();

  $(".error").show();
  $(".status-text-sub").show();
  $(".status-text").text("Opps! Something Went Wrong.");
}

function hideLoader() {
  $(".SubmissionLoader").hide();
}


