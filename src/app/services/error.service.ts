import { Injectable } from '@angular/core';

import { NotifyService } from './notify.service';

interface MessagesIndex {
  [index: string]: string;
}

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  params = {
    'user-not-found': 'Não há nenhum usuário com os valores fornecidos.',
    'wrong-password': 'A senha está incorreta',
    'expired-action-code': 'A ação está expirada',
    'user-disabled': 'O usuário foi desabilitado',
    'weak-password': 'A senha é fraca',
    'email-already-in-use': 'E-mail já está cadastrado no sistema',
    'invalid-email': 'O e-mail fornecido é invalido',
    'network-request-failed': 'Ocorreu um erro de conexão à internet',
    'user-cancelled': 'Você não permitiu acesso à aplicação',
    'popup-closed-by-user': 'Você não finalizou o acesso',
    'internal-error': 'Erro interno no servidor',
    'unauthorized-domain': 'Sua rede está bloqueando a solicitação',
    'cancelled-popup-request': 'Você cancelou a solicitação',
    'auth/email-already-in-use': 'Esse endereço de e-mail já está em uso',
    'object-not-found': 'Arquivo não encontrado'
    /* Add here the others IDs and the corresponding messages */
  } as MessagesIndex;

  constructor(private _notify: NotifyService) { }

  public handleErrorByCode(code: string) {
    code = code.split('/')[1];
    if (this.params[code]) {
      return this._notify.update('danger', this.params[code]);
    } else {
      return this._notify.update('danger', `Ocorreu algum erro desconhecido! <br> Código erro: ${code}`);
    }
  }

  public handleErrorByMessage(message: string) {
    return this._notify.update('danger', message);
  }
}
