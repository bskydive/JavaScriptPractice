window.$(document).ready(function () {
    "use strict";
    var $ = window.$, Backbone = window.Backbone, console = window.console, _ = window._;

    $(".c-column-center").addClass("col-md-12");
    $(".c-column-userList").addClass("col-md-3");

    //$("#id-container-userEdit").addClass("hidden");


    //function offsetResize() {
    //    var navTopHeight = $('.c-columnNavTop').height();
    //    $(".c-containerMain").css('padding-top', navTopHeight);
    //    $(".c-anchorOffset").css('top', -(navTopHeight - 30));
    //}
    //
    //offsetResize();
    //$(window).resize(function () {
    //    offsetResize();
    //});


    //============================================COLLECTION======================================================

    function genUuid() {

        return window.Date.now().toString() + "-" + Math.random().toString(36).substring(2, 15);
    }


    function checkString(val) {

        return (val.toString() === val.toString);
    }

    function checkStringLength(val, min, max) {

        return (checkString(val) && val.length <= max && val.length >= min);
    }

    function validateFirstName(attrs) {

        if (!checkStringLength(attrs.firstName, 3, 25)) {
            return "First name " + attrs.uuidNumber.toString() + " should be 3 to 25 letters long";
        } else {
            return true;
        }
    }

    function validateLastName(attrs) {

        if (!checkStringLength(attrs.lastName, 3, 25)) {
            return "Last name " + attrs.uuidNumber.toString(attrs) + " should be 3 to 25 letters long";
        } else {
            return true;
        }
    }

    function validateSurName(attrs) {
        if (!checkStringLength(attrs.surName, 3, 25)) {
            return "Surname " + attrs.uuidNumber.toString() + " should be 3 to 25 letters long";
        } else {
            return true;
        }
    }

    function validateBirthDate(attrs) {

        //var dateformat = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;
        //// Match the date format through regular expression
        //if (inputText.value.match(dateformat)) {
        //    document.form1.text1.focus();
        //    //Test which seperator is used '/' or '-'
        //    var opera1 = inputText.value.split('/');
        //    var opera2 = inputText.value.split('-');
        //    var lopera1 = opera1.length;
        //    var lopera2 = opera2.length;
        //    var pdate = "";
        //
        //    // Extract the string into month, date and year
        //    if (lopera1 > 1) {
        //        pdate = inputText.value.split('/');
        //    }
        //    else if (lopera2 > 1) {
        //        pdate = inputText.value.split('-');
        //    }
        //
        //    var mm = parseInt(pdate[0]);
        //    var dd = parseInt(pdate[1]);
        //    var yy = parseInt(pdate[2]);
        //    // Create list of days of a month [assume there is no leap year by default]
        //    var ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        //    if (mm == 1 || mm > 2) {
        //        if (dd > ListofDays[mm - 1]) {
        //            alert('Invalid date format!');
        //            return false;
        //        }
        //    }
        //    if (mm == 2) {
        //        var lyear = false;
        //        if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
        //            lyear = true;
        //        }
        //        if ((lyear === false) && (dd >= 29)) {
        //            alert('Invalid date format!');
        //            return false;
        //        }
        //        if ((lyear === true) && (dd > 29)) {
        //            alert('Invalid date format!');
        //            return false;
        //        }
        //    }
        //}
        //else {
        //    alert("Invalid date format!");
        //    document.form1.text1.focus();
        //    return false;
        //}


        return true;


    }

    function validateEMail(attr) {
        //"blankEMail@stepanovv.ru"

        return true;
    }

    function validatePhoneNumber(attr) {
        //"+71112233344"
        return true;
    }

    function validateUuidNumber(attr) {

        return (!attr.isEmpty && attr.length > 20 && attr.length < 30 && attr === attr.toString());
    }

    function validateAllAttrs(attrs) {
        var result = "";

        //if (!validateFirstName(attrs)) { result = result +  }
        //
        //if (result === "") {
        //    return true;
        //} else {
        //    return result;
        //}

        //todo change return type for all validators to [bool,str]

    }

    var UserListModelLabel = Backbone.Model.extend({
        defaults: {
            firstName: "First Name",
            lastName: "Last Name",
            surName: "Surname",
            birthDate: "Birth date",
            eMail: "e-mail",
            phoneNumber: "Phone Number"
        }
    });

    var UserListModelPlaceholder = Backbone.Model.extend({
        defaults: {
            firstName: "blankFirstName",
            lastName: "blankLastName",
            surName: "blankSurName",
            birthDate: "21.01.1901",
            eMail: "blankEMail@stepanovv.ru",
            phoneNumber: "+71112233344"
        }
    });

    var UserListModelInputType = Backbone.Model.extend({
        defaults: {
            firstName: "text",
            lastName: "text",
            surName: "text",
            birthDate: "date",
            eMail: "email",
            phoneNumber: "text"
        }
    });

    var UserListModel = Backbone.Model.extend({
        defaults: {
            firstName: "blankFirstName",
            lastName: "blankLastName",
            surName: "blankSurName",
            birthDate: new Date(1901, 0, 2),
            eMail: "blankEMail@stepanovv.ru",
            phoneNumber: "+71112233344",
            //The order is matter!
            birthDateLocal: "01.01.1901",
            uuidNumber: "1000000000000-xxxxxxxxxxx"
            //idAttribute: "uuidNumber"
        }
    });

    var UserListCollection = Backbone.Collection.extend({

        model: UserListModel,
        modelId: function (attrs) {
            return attrs.uuidNumber;
        }

    });


    function fillCollection(varCollection) {
        for (var i = 0; i <= 3; i++) {
            varCollection.add(
                {
                    firstName: "FirstName" + i.toString(),
                    lastName: "LastName" + i.toString(),
                    surName: "SurName" + i.toString(),
                    birthDate: new Date(1901 + i, 0, 2),
                    eMail: i.toString() + "EMail@stepanovv.ru",
                    phoneNumber: "+7111223334" + i.toString(),
                    birthDateLocal: toLocalDate(new Date(1901 + i, 0, 2)),
                    uuidNumber: genUuid()
                }
            );
        }

        if (varCollection.isValid) {
            console.log(varCollection.validationError);
        }
    }

    //================================================VIEW==================================================

    function toLocalDate(varDate) {
        var options = {
            //era: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
            //weekday: 'long',
            //timezone: 'UTC',
            //hour: 'numeric',
            //minute: 'numeric',
            //second: 'numeric'
        };

        var varLocale = "ru-RU";

        return varDate.toLocaleString(varLocale, options).toString();
    }

    var UserListView = Backbone.View.extend({
        el: "#id-tbody-userList",
        //events: {
        //    'click .c-btn-edit': 'eventUserEdit',
        //    'click .c-btn-delete': 'eventUserDelete'
        //},

        eventUserDelete: function (uuid) {
            this.collection.remove(uuid);
            this.render();
        },

        render: function () {
            var self = this;
            $('#id-containerMain').hide();
            this.$el.html("");

            this.collection.each(
                function (eachModel) {
                    var template = _.template($("#id-user-list-template").html());
                    //eachModel.set('birthDateLocal', toLocalDate(eachModel.get('birthDate')));
                    var html = template(eachModel.toJSON());
                    self.$el.append(html);

                }
            );
            $('#id-container-userList').show();
            return this;
        }

        //nextOrder: function () {
        //    if (!this.length) {
        //        return 1;
        //    }
        //    return this.last().get('order') + 1;
        //},
        //
        //comparator: 'order'
    });


    var UserEditView = Backbone.View.extend({
        el: "#id-form-userEdit",
        events: {
            'click #id-btn-cancel': 'eventUserCancel',
            'click #id-btn-save': 'eventUserSave'
        },

        eventUserSave: function () {

            var newModel = new UserListModel();

            //todo add validation
            newModel.set({
                firstName: $("#id-input-firstName").attr("value"),
                lastName: $("#id-input-lastName").attr('value'),
                surName: $("#id-input-surName").attr('value'),
                birthDate: Date.parse($("#id-input-birthDate").attr('value')), //todo parse to new Date()!!!
                eMail: $("#id-input-eMail").attr('value'),
                phoneNumber: $("#id-input-phoneNumber").attr("value"),
                birthDateLocal: toLocalDate(Date.parse($("#id-input-birthDate").attr('value'))),
                //todo parse from new Date()!!!
                //The specified value "Sat Jan 02 1904 00:00:00 GMT+0300 (MSK)" does not conform to the required format, "yyyy-MM-dd".
                uuidNumber: genUuid()
            });

            this.collection.add(newModel);
            userListView1.collection = this.collection;//todo use global collection or rest server

            this.router.navigate('list', {trigger: true});
            return newModel;
        },

        eventUserCancel: function () {
            this.router.navigate('list', {trigger: true});
            return false;
        },

        render: function (options) {
            $('.c-containerMain').hide();


            this.$el.html("");

            var self = this;
            var modelByUuid = new UserListModel();

            //todo add error on absent uuid's
            //todo validate uuid's
            if (options.uuid.length > 10 && options.uuid !== "new") {
                modelByUuid = this.collection.get(options.uuid);
            }


            var modelLabel = new UserListModelLabel(), modelPlaceholder = new UserListModelPlaceholder(),
                modelInputType = new UserListModelInputType();

            var template = _.template($("#id-template-userEdit").html());

            var modelKeys = _.keys(modelByUuid.toJSON());

            for (var i = 0; i < (modelKeys.length - 2); i++) {//length-1 make uuid not visible

                var keyName = modelKeys[i];

                modelByUuid.set({
                    //todo fix date display with bootstrap input field type
                    editParamLabel: modelLabel.get(keyName),
                    editParamName: keyName,
                    editParamPlaceholder: modelPlaceholder.get(keyName),
                    inputEditType: modelInputType.get(keyName),
                    inputEditValue: modelByUuid.get(keyName)
                });

                var html = template(modelByUuid.toJSON());
                self.$el.append(html);
            }

            //modelByUuid.set({
            //    editParamLabel: modelLabel.get('firstName'),
            //    editParamName: 'firstName',
            //    editParamPlaceholder: modelPlaceholder.get('firstName'),
            //    inputEditType: modelInputType.get('firstName'),
            //    inputEditValue: modelByUuid.get('firstName')
            //});


            //нужно создавать имена полей с обходом по модели
            //имена полей должны совпадать с this.saveuser!

            self.$el.append($("#id-template-btn-userEdit").html());

            $(".c-form-group-buttons").addClass("col-sm-offset-2 col-sm-6");
            $(".c-form-group-input").addClass("col-sm-6");
            $(".c-form-group-label").addClass("col-sm-2");

            $('#id-container-userEdit').show();

            return this;
        }
    });

    //==============================================ROUTER====================================================
    var Router = Backbone.Router.extend({

        routes: {
            '': 'routeUserList',
            'list': 'routeUserList',
            'edit/:uuidLink': 'routeUserEdit',
            'delete/:uuidLink': 'routeUserDelete'
        },

        routeUserList: function () {
            $('.c-containerMain').hide();

            userListView1.render();

            $('#id-container-userList').show();
        },

        //routeUserAdd: function () {
        //    $('.c-containerMain').hide();
        //    userEditView1.render();
        //    $('#id-container-userEdit').show();
        //},

        routeUserEdit: function (uuidLink) {
            //$('.c-containerMain').hide();
            userEditView1.render({uuid: uuidLink});
            //$('#id-container-userEdit').show();

        },

        routeUserDelete: function (uuidLink) {
            //$('.c-containerMain').hide();
            userListView1.eventUserDelete(uuidLink);
            //$('#id-container-userList').show();

        }

        //routeUserDelete: function () {
        //    $('.c-containerMain').hide();
        //
        //    userEditView1.deleteUser({uuid: uuidLink});
        //    $('#id-container-userEdit').show();
        //}
    });


    //==============================================CALCULATIONS====================================================


    var userListCollection1 = new UserListCollection();

    fillCollection(userListCollection1);

    var userListView1 = new UserListView({collection: userListCollection1});

    var userEditView1 = new UserEditView({collection: userListCollection1});

    var router1 = new Router();

    userEditView1.router = router1;
    userListView1.router = router1;

    Backbone.history.start();

    router1.navigate('list', {trigger: true});


});