import { hashPass } from '../../util/auth';
import { getCredentialsByLogin, isExpiredTemporaryPassword, updateCredentials } from '../../services/credentials';

export function getUpdatePassPage(req: any, res: any) {
    const login = req.params.login;
    getCredentialsByLogin(login)
    .then(credentials => {
        if(!credentials || isExpiredTemporaryPassword(credentials) || !credentials.isTemporary){
            res.render('update-pass' , { 
                login: '',
                updated: true,
                success: false
            });
        }
        res.render('update-pass' , { 
            login: login,
            updated: false
        });
    })
    .catch(() => {
        res.render('update-pass' , { 
            login: '',
            updated: true,
            success: false
        });
    })
}

export function updatePass(req: any, res: any) {
    const {login, newPassword, confirmPassword} = req.body;
    if(newPassword !== confirmPassword){
        res.render('update-pass' , { 
            login: '',
            updated: true,
            success: false
        });
    }

    getCredentialsByLogin(login)
    .then(credentials => {
        if(!credentials || isExpiredTemporaryPassword(credentials)){
            res.render('update-pass' , { 
                login: '',
                updated: true,
                success: false
            });
        }
        return hashPass(newPassword)
    })
    .then(hashedPass => {
        return updateCredentials(login, hashedPass, false)
    })
    .then(() => {
        res.render('update-pass' , { 
            login: '',
            updated: true,
            success: true
        });
    })
    .catch(() => {
        res.render('update-pass' , { 
            login: '',
            updated: true,
            success: false
        });
    })
}