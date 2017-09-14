function editHandler() {
  $(".edit").click(function() {
    $(".edit").toggleClass("active");

    if($(".edit").hasClass("active")) {
      $(".edit").html("save");

      $(".linklist").each(function() {
        tempLi = document.createElement("li");
        tempA = document.createElement("a");
        $(tempLi).addClass("create-li").hide();
        $(tempA).html("<i class=\"fa fa-plus\" aria-hidden=\"true\"></i>").appendTo(tempLi).addClass("create-link").attr("href", "javascript:void(0);");
        $(this).append(tempLi);
        $(this).children(".create-li").slideDown();

      });

      $(".link").each(function() {
        editButton = document.createElement("a");
        $(editButton).html("<i class=\"fa fa-pencil\" aria-hidden=\"true\"></i>").addClass("edit-button").attr("href", "javascript:void(0);");
        $(this).prepend(editButton);

        deleteButton = document.createElement("a");
        $(deleteButton).html("<i class=\"fa fa-times\" aria-hidden=\"true\"></i>").addClass("delete-button").attr("href", "javascript:void(0);");
        $(this).append(deleteButton);
      });
    } else {
      $(".edit").html("edit");


      $(".edit-button").remove();
      $(".delete-button").remove();
      $(".create-li").slideUp("normal", function() {
        $(this).remove();
        saveLinks();
      });

    }
  });

  $(".linklist").on("click", ".delete-button", function() {
    var confirmationDiv = document.createElement("div");
    var tempYes = document.createElement("a");
    var tempNo = document.createElement("a");
    $(tempYes).html("<i class=\"fa fa-check\" aria-hidden=\"true\"></i>").attr("href", "javascript:void(0);").addClass("confirm-yes");
    $(tempNo).html("<i class=\"fa fa-times\" aria-hidden=\"true\"></i>").attr("href", "javascript:void(0);").addClass("confirm-no");

    $(confirmationDiv).html("Are you sure?").append(tempYes).append(tempNo).addClass("confirmation");
    $(this).parent().append(confirmationDiv);
  });

  $(".linklist").on("click", ".confirm-yes", function() {
    $(this).parent().parent().remove();
  });
  $(".linklist").on("click", ".confirm-no", function() {
    $(this).parent().remove();
  });

  $(".linklist").on("click", ".edit-button", function() {
    tempCancelBtn = document.createElement("a");
    tempNextBtn = document.createElement("a");
    tempBackBtn = document.createElement("a");
    tempFinishBtn = document.createElement("a");

    $(tempCancelBtn).html("<i class=\"fa fa-times\" aria-hidden=\"true\"></i>").attr("href", "javascript:void(0);").addClass("cancel-btn edit-btn");
    $(tempNextBtn).html("<i class=\"fa fa-chevron-right\" aria-hidden=\"true\"></i>").attr("href", "javascript:void(0);").addClass("next-btn edit-btn");

    $(this).parent().prepend(tempCancelBtn);


    $(this).siblings(".ql").hide();
    divHold = $(this).siblings(".ql");

    tempTitle = document.createElement("textarea");
    $(tempTitle).attr("placeholder", "name").text(divHold.html()).addClass("ql-text name");
    $(this).parent().append(tempTitle);
    $(this).parent().children(".name").select();

    $(this).parent().append(tempNextBtn);
    $(this).parent().children(".edit-button, .delete-button").remove();
  });

  $(".linklist").on("click", ".cancel-btn", function() {
    if(!$(this).parent().hasClass("create-li")) {
      editButton = document.createElement("a");
      $(editButton).html("<i class=\"fa fa-pencil\" aria-hidden=\"true\"></i>").addClass("edit-button").attr("href", "javascript:void(0);");
      $(this).parent().prepend(editButton);

      deleteButton = document.createElement("a");
      $(deleteButton).html("<i class=\"fa fa-times\" aria-hidden=\"true\"></i>").addClass("delete-button").attr("href", "javascript:void(0);");
      $(this).parent().append(deleteButton);
    }

    $(this).siblings(".ql").show();
    $(this).siblings(".ql-text").remove();

    $(this).parent().children(".cancel-btn, .next-btn").remove();
  });
  $(".linklist").on("click", ".back-btn", function() {
    tempCancelBtn = document.createElement("a");
    tempNextBtn = document.createElement("a");

    $(tempCancelBtn).html("<i class=\"fa fa-times\" aria-hidden=\"true\"></i>").attr("href", "javascript:void(0);").addClass("cancel-btn edit-btn");
    $(tempNextBtn).html("<i class=\"fa fa-chevron-right\" aria-hidden=\"true\"></i>").attr("href", "javascript:void(0);").addClass("next-btn edit-btn");

    $(this).siblings(".url").hide();
    $(this).siblings(".name").show().select();
    $(this).parent().prepend(tempCancelBtn);
    $(this).parent().append(tempNextBtn);

    $(this).parent().children(".finish-btn, .back-btn").remove();
  });
  $(".linklist").on("click", ".next-btn", function() {
    tempBackBtn = document.createElement("a");
    tempFinishBtn = document.createElement("a");

    $(tempBackBtn).html("<i class=\"fa fa-chevron-left\" aria-hidden=\"true\"></i>").attr("href", "javascript:void(0);").addClass("back-btn edit-btn");
    $(tempFinishBtn).html("<i class=\"fa fa-check\" aria-hidden=\"true\"></i>").attr("href", "javascript:void(0);").addClass("finish-btn edit-btn");

    if ($(this).siblings(".ql").hasClass("create-link")) {
      $(this).siblings(".ql").attr("href", "");
    }

    if ($(this).siblings(".url").length) {
      $(this).siblings(".url").show();
    } else {
      divHold = $(this).siblings(".ql");
      tempURL = document.createElement("textarea");
      $(tempURL).attr("placeholder", "url").text(divHold.attr("href")).addClass("ql-text url");
      $(this).parent().append(tempURL);
    }

    $(this).siblings(".url").select();
    $(this).siblings(".name").hide();

    $(this).parent().prepend(tempBackBtn);
    $(this).parent().append(tempFinishBtn);

    // Remove buttons
    $(this).parent().children(".cancel-btn, .next-btn").remove();
  });
  $(".linklist").on("click", ".finish-btn", function() {
    editButton = document.createElement("a");
    $(editButton).html("<i class=\"fa fa-pencil\" aria-hidden=\"true\"></i>").addClass("edit-button").attr("href", "javascript:void(0);");
    $(this).parent().prepend(editButton);

    deleteButton = document.createElement("a");
    $(deleteButton).html("<i class=\"fa fa-times\" aria-hidden=\"true\"></i>").addClass("delete-button").attr("href", "javascript:void(0);");
    $(this).parent().append(deleteButton);

    if ($(this).siblings(".ql").hasClass("create-link")) {
      $(this).siblings(".ql").removeClass("create-link");
      $(this).parent().removeClass("create-li");
    }

    var tempName = $(this).siblings(".name").val();
    var tempURL = $(this).siblings(".url").val();

    if (!$(this).closest(".link").next(".create-li").length) {
      // Append new 'create-link' button
      tempLi = document.createElement("li");
      tempA = document.createElement("a");
      $(tempLi).addClass("create-li").hide();
      $(tempA).html("<i class=\"fa fa-plus\" aria-hidden=\"true\"></i>").appendTo(tempLi).addClass("create-link").attr("href", "javascript:void(0);");

      $(this).closest(".linklist").append(tempLi);
      $(this).closest(".linklist").children(".create-li").slideDown();

    }

    if (tempName == "" || tempURL == "") {
      $(this).parent().remove();
    } else {
      $(this).siblings(".ql").html(tempName).attr("href", tempURL).show();
      $(this).parent().children(".finish-btn, .back-btn, .ql-text").remove();
    }


  });

  $(".linklist").on("click", ".create-link", function() {
    tempCancelBtn = document.createElement("a");
    tempNextBtn = document.createElement("a");

    $(this).parent().addClass("link");
    $(this).addClass("ql");
    $(tempCancelBtn).html("<i class=\"fa fa-times\" aria-hidden=\"true\"></i>").attr("href", "javascript:void(0);").addClass("cancel-btn edit-btn");
    $(tempNextBtn).html("<i class=\"fa fa-chevron-right\" aria-hidden=\"true\"></i>").attr("href", "javascript:void(0);").addClass("next-btn edit-btn");

    $(this).parent().prepend(tempCancelBtn);
    $(this).hide();

    tempTitle = document.createElement("textarea");
    $(tempTitle).attr("placeholder", "name").addClass("ql-text name");
    $(this).parent().append(tempTitle);
    $(this).parent().children(".name").select();
    $(this).parent().append(tempNextBtn);


  });
}

$(document).ready(function() {
  editHandler();
});
