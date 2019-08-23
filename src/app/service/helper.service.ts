import { Injectable } from '@angular/core';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable()
export class HelperService {
    // private toasterService: ToasterService;
    public emailReg = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    fileMaxSize;
    fileFormateAllowed;
    public ProfileUpdate:Subject<Boolean> = new Subject();
    constructor(
        private toasterService: ToasterService,
        private router: Router,
    ) {
    }

    empty(mixed_var) {
        var undef, key, i, len;
        var emptyValues = [undef, null, false, '', undefined, "undefined"];

        for (i = 0, len = emptyValues.length; i < len; i++) {
            if (mixed_var === emptyValues[i]) {
                return true;
            }
        }

        if (typeof mixed_var === 'object') {
            for (key in mixed_var) {
                // TODO: should we check for own properties only?
                // if (mixed_var.hasOwnProperty(key)) {
                return false;
                // }
            }
            return true;
        }
        return false;
    }

    setPREF(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value));
    }

    getPREF(key) {
        if (this.empty(window.localStorage.getItem(key))) {
            return null;
        }
        return JSON.parse(window.localStorage.getItem(key));
    }

    setPREFString(key, value) {
        window.localStorage.setItem(key, value);
    }

    getPREFString(key) {
        return window.localStorage.getItem(key);
    }

    delPREF(key) {
        return window.localStorage.removeItem(key);
    }

    delAllPREF() {
        return window.localStorage.clear();
    }

    isDigit(digit) {
        var regex = /^[0-9]+$/;
        if (digit !== '') {
            if (digit.match(regex)) {
                return true;
            }
        }
        return false;
    }

    isNumeric(mixed_var) {
        var whitespace = " \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000";
        return (typeof mixed_var === 'number' || (whitespace.indexOf(mixed_var.slice(-1)) === -1)) && mixed_var !== '' && !isNaN(mixed_var);
    }

    isDefined(variable) {
        if (typeof variable == 'boolean') return true;
        return (typeof variable !== undefined && variable != null && variable != "");
    }

    inArray(needle, haystack, argStrict) {
        var key = '',
            strict = !!argStrict;

        //we prevent the double check (strict && arr[key] === ndl) || (!strict && arr[key] == ndl)
        //in just one for, in order to improve the performance 
        //deciding wich type of comparation will do before walk array
        if (strict) {
            for (key in haystack) {
                if (haystack[key] === needle) {
                    return true;
                }
            }
        } else {
            for (key in haystack) {
                if (haystack[key] == needle) {
                    return true;
                }
            }
        }

        return false;
    }

    parseErrorMessage(message) {
        let errorMessage = "";
        try {
            errorMessage = (JSON.parse(message)).message;
        } catch (e) {
            if (typeof message == 'object') {
                errorMessage = message.message;
            } else {
                errorMessage = message;
            }
        }
        return errorMessage;
    }

    showSuccess(message) {
        let successMessage = this.parseErrorMessage(message);
        this.toasterService.pop('success', successMessage);
    }

    showError(message) {
        let errorMessage = this.parseErrorMessage(message);
        this.toasterService.pop('error', message);
    }

    showWarning(message) {
        let warningMessage = this.parseErrorMessage(message);
        this.toasterService.pop('warning', warningMessage);
    }

    showInfo(message) {
        let infoMessage = this.parseErrorMessage(message);
        this.toasterService.pop('info', infoMessage);
    }

    showPrimary(message) {
        let primaryMessage = this.parseErrorMessage(message);
        this.toasterService.pop('primary', primaryMessage);
    }

    generateFormData(currentObject, item, imageKey, contentId) {
        let formData = new FormData;
        let keys = Object.keys(item);
        keys.forEach(function (val) {
            if (currentObject.ignoreFields.indexOf(val) == -1) {
                if (["en", "ar"].indexOf(val) > -1) {
                    var innerKey = Object.keys(item[val]);
                    innerKey.forEach(function (innerVal) {
                        formData.append("data[" + val + "][" + innerVal + "]", item[val][innerVal]);
                    });
                } else if (currentObject.replaceFields && currentObject.replaceFields[val]) {
                    formData.append(currentObject.replaceFields[val], currentObject[currentObject.replaceFields[val]]);
                } else {
                    formData.append(val, item[val]);
                }
            }
        });
        if (currentObject[imageKey]) {
            formData.append(imageKey, currentObject[imageKey][0]);
        } else if ((!this.empty(currentObject["compulsaryImage"]) && currentObject["compulsaryImage"] && (!this.empty(imageKey) || !this.empty(currentObject[contentId])))) {
            if (!currentObject[contentId] && (!("isEdit" in currentObject) || ("isEdit" in currentObject && !currentObject["isEdit"]))) {
                return false;
            }
        }
        return formData;
    }

    generateData(currentObject, item, contentId) {
        let data = {};
        let keys = Object.keys(item);
        keys.forEach(function (val) {
            if (currentObject.ignoreFields.indexOf(val) == -1) {
                if (["en", "ar"].indexOf(val) > -1) {
                    var innerKey = Object.keys(item[val]);
                    innerKey.forEach(function (innerVal) {
                        data[val][innerVal] = item[val][innerVal];
                    });
                } else if (currentObject.replaceFields && currentObject.replaceFields[val]) {
                    data[currentObject.replaceFields[val]] = currentObject[currentObject.replaceFields[val]];
                } else {
                    data[val] = item[val];
                }
            }
        });
        return data;
    }

    printLog(str: any) {
        if (!environment.production) {
            // console.log(str);
        }
    }

    checkValue($event) {
        let value = parseFloat($event.target.value);
        let decimalPoint: any = value.toString().split('.');
        if (decimalPoint.length > 1) {
            decimalPoint = decimalPoint[1];
        } else {
            decimalPoint = '0';
        }
        if (value > 999999999.99) {
            $event.target.value = (value / 10).toFixed(2);
        } else if (decimalPoint.length > 2) {
            $event.target.value = value.toFixed(2);
        }
    }

    //on select image
    fileChange(event) {
        return new Promise((resolve, reject) => {
            let fileList: FileList = event.target.files;
            let imagesArray = [];
            for (let i in fileList) {
                let indx = parseInt(i)
                if (!isNaN(indx)) {
                    let file: File = fileList[indx];
                    // let fileTypeI = (this.fileFormateAllowed.indexOf(file.type) === -1) ? 1 : 0;
                    this.fileFormateAllowed = (file.size > this.fileMaxSize) ? 1 : 0;
                    if (this.fileFormateAllowed === 0) {
                        let fileName = file.name;
                        var reader = new FileReader();
                        reader.onload = (event: any) => {
                            let url = event.target.result;
                            let data = {
                                fileName: fileName,
                                image: url,
                                fileObj: file
                            }
                            imagesArray.push(data);
                            if (fileList.length === imagesArray.length) {
                                resolve({ "Data": imagesArray });
                            }
                        }
                        reader.readAsDataURL(fileList[indx]);
                    }
                    else {
                        reject(false);
                    }
                }
            }
        });
    }

    emitProfile(change: any) {
        this.ProfileUpdate.next(change);
    }

    listenProfile() {
        return this.ProfileUpdate.asObservable();
    }
}
