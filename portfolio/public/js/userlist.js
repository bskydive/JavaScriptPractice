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

        if (!checkStringLength(attrs.attributes.firstName.value, 3, 25)) {
            return "First name " + attrs.attributes.uuidNumber.value.toString() + " should be 3 to 25 letters long";
        } else {
            return true;
        }
    }

    function validateLastName(attrs) {

        if (!checkStringLength(attrs.attributes.lastName.value, 3, 25)) {
            return "Last name " + attrs.attributes.uuidNumber.value.toString(attrs) + " should be 3 to 25 letters long";
        } else {
            return true;
        }
    }

    function validateSurName(attrs) {
        if (!checkStringLength(attrs.attributes.surName.value, 3, 25)) {
            return "Surname " + attrs.attributes.uuidNumber.value.toString() + " should be 3 to 25 letters long";
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

        return (attr !== undefined && attr.length > 20 && attr.length < 30 && attr === attr.toString());
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
        return true;

    }


    var UserListModel = Backbone.Model.extend({
        defaults: {
            firstName: {
                value: "",
                label: "First name",
                inputType: "text",
                placeholder: "William"
            },
            lastName: {
                value: "",
                label: "Last name",
                inputType: "text",
                placeholder: "Shakespeare"
            },
            surName: {
                value: "",
                label: "Surname",
                inputType: "text",
                placeholder: "John's"
            },
            birthDate: {
                value: "",
                label: "Birth date",
                inputType: "text",
                placeholder: "26.04.1564"
            },
            eMail: {
                value: "",
                label: "e-mail",
                inputType: "text",
                placeholder: "Shakespeare@gmail.com"
            },
            phoneNumber: {
                value: "",
                label: "Mobile phone number",
                inputType: "text",
                placeholder: "+44 871 789 3642"
            },
            //The order is matter!
            //birthDateLocal: "01.01.1901",
            uuidNumber: "1000000000000-xxxxxxxxxxx"
            //idAttribute: "uuidNumber"
        },
        idAttribute:"uuidNumber",
        isValid: validateAllAttrs()
    });

    var UserListCollection = Backbone.Collection.extend({

        model: UserListModel,
        //modelId: function (attrs) {
        //    return attrs.uuidNumber;
        //},
        //todo implement "add" to avoid error in case of uuid update
        collectionUpdate: function (model1) {
            //dummy save without rest service

            if (userListCollection1.get(model1.uuidNumber) !== undefined) {
                userListCollection1.remove(model1.uuidNumber);
            }
            userListCollection1.add(model1);
        }
        //,
        //collectionRemove: function (uuid) {
        //    //dummy save without rest service
        //
        //    userListCollection1.remove(uuid);
        //
        //}


    });


    function fillCollection(varCollection) {

        for (var i = 0; i <= 3; i++) {
            //var newModel = new UserListModel();

            //newModel.set(
            //    'firstName',{value: "FirstName" + i.toString()},
            //    'lastName',{value: "LastName" + i.toString()},
            //    'urName',{value: "SurName" + i.toString()},
            //    'birthDate',{value: "21.01." + (1901 + i).toString()},
            //    'eMail',{value: i.toString() + "EMail@stepanovv.ru"},
            //    'phoneNumber',{value: "+7111223334" + i.toString()}
            //);
            //birthDateLocal: toLocalDate(new Date(1901 + i, 0, 2)),



                varCollection.add({

                    firstName: {value: "FirstName" + i.toString()},
                    lastName: {value: "LastName" + i.toString()},
                    surName: {value: "SurName" + i.toString()},
                    birthDate: {value: "21.01." + (1901 + i).toString()},
                    eMail: {value: i.toString() + "EMail@stepanovv.ru"},
                    phoneNumber: {value: "+7111223334" + i.toString()},
                    uuidNumber: genUuid()
                });

            //for (var i = 0; i <= 3; i++) {
            //    varCollection.add(
            //        {
            //            firstName: "FirstName" + i.toString(),
            //            lastName: "LastName" + i.toString(),
            //            surName: "SurName" + i.toString(),
            //            birthDate: new Date(1901, 0, i),
            //            birthDateLocal: "",
            //            eMail: i.toString() + "EMail@stepanovv.ru",
            //            phoneNumber: "+7111223334" + i.toString()
            //        }
            //    );
            //}
            //
            //if (varCollection.isValid) {
            //    console.log(varCollection.validationError);
            //}




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
            //this.collection.remove(uuid);
            this.collection.remove(uuid);
            this.render();
        },

        render: function () {
            var self = this;
            $('#id-containerMain').hide();

            //$('#id-container-userList').datepicker({
            //    format: "dd.mm.yyyy",
            //    weekStart: 1,
            //    startDate: "01.01.1900",
            //    endDate: "01.01.2100",
            //    todayBtn: "linked",
            //    language: "ru"
            //});

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

        eventUserSave: function (options) {
            var uuid = options.currentTarget.formAction.split('/edit/')[1];//get uuid numer from url

            if (uuid === 'new') {
                var newModel = new UserListModel();

                uuid = newModel.uuidNumber;
            }

            if (validateUuidNumber(uuid) && this.collection.get(uuid)) {

                var modelByUuid = this.collection.get(uuid);

                //todo add validation

                //firstName.value = $("#id-input-firstName").attr("value");

                modelByUuid.attributes.firstName.value = $("#id-input-firstName").attr("value");
                modelByUuid.attributes.lastName.value = $("#id-input-lastName").attr('value');
                modelByUuid.attributes.surName.value = $("#id-input-surName").attr('value');
                modelByUuid.attributes.birthDate.value = $("#id-input-birthDate").attr('value');
                modelByUuid.attributes.eMail.value = $("#id-input-eMail").attr('value');
                modelByUuid.attributes.phoneNumber.value = $("#id-input-phoneNumber").attr("value");


                this.collection.collectionUpdate(modelByUuid);
                this.router.navigate('list', {trigger: true});
                //return newModel;

            } else {
                console.log("userEditView.eventUserSave invalid uuid number:" + uuid);
            }


        },

        eventUserCancel: function () {
            this.router.navigate('list', {trigger: true});
            return false;
        },

        render: function (options) {

            if (validateUuidNumber(options.uuid) && this.collection.get(options.uuid)) {

                var modelByUuid = this.collection.get(options.uuid);

                $('.c-containerMain').hide();

                this.$el.html("");

                var self = this;


                var template = _.template($("#id-template-userEdit").html());

                var modelValues = _.values(modelByUuid.toJSON());//get values {value,placeholder, etc} for every attribute of single model
                var modelKeyNames = _.allKeys(modelByUuid.toJSON());

                for (var i = 0; i < (modelValues.length - 2); i++) {//length-1 make uuid not visible

                    var modelValue = modelValues[i];

                    modelValue.set({keyName: modelKeyNames[i]});

                    var html = template(modelValue.toJSON());
                    self.$el.append(html);
                    //$('#id-input-birthDate').attr("data-date-format", "dd.MM.YYYY");
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
            } else {
                console.log("userEditView.render invalid uuid:" + options.uuid);
            }
        }
    });

//==============================================ROUTER====================================================
    var Router = Backbone.Router.extend({

        routes: {
            '': 'routeUserList',
            'list': 'routeUserList',
            'edit/:uuidLink': 'routeUserEdit',
            'edit/new': 'routeUserNew',
            'delete/:uuidLink': 'routeUserDelete'
        },

        routeUserList: function () {
            $('.c-containerMain').hide();

            userListView1.render();

            $('#id-container-userList').show();
        },

        routeUserEdit: function (uuidLink) {
            userEditView1.render({uuid: uuidLink});
        },

        routeUserNew: function () {
            userEditView1.render({uuid: "new"});
        },

        routeUserDelete: function (uuidLink) {
            userListView1.eventUserDelete(uuidLink);
        }

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


})
;