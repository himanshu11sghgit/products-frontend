import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ToastMessageService {

    constructor(
        private toastr: ToastrService,
    ) {
    }

    showSuccess(message: string, timeout?: any) {
        if (!this.toastr.findDuplicate('', message, false, false)) {
            this.toastr.success(message, '', {
                enableHtml: true,
                progressBar: true,
                timeOut: timeout || 2000
            });
        }
    }

    showError(message: string, setting?: any, timeout?: any) {
        if (!this.toastr.findDuplicate('', message, false, false)) {
            if (setting) {
                this.toastr.error(message, '', {
                    enableHtml: true,
                    progressBar: true,
                    timeOut: timeout 
                });
            } else {
                this.toastr.error(message, '', {
                    enableHtml: true,
                    progressBar: true,
                });
            }
        }
    }

}