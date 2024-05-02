import { provide } from '@lit/context'
import { LitElement, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import {
  HideAllSignaturesEvent,
  PushSignatureEvent,
  SetSignatureVisibilityEvent,
  ShowAllSignaturesEvent,
  SignatureData,
  signaturesContext,
} from '../contexts/signatures.context'

@customElement('app-element')
export class AppElement extends LitElement {
  @provide({ context: signaturesContext })
  @state()
  private signatures: SignatureData[] = []

  override connectedCallback() {
    super.connectedCallback()

    this.addEventListener(PushSignatureEvent.key, this.handlePushSignatureEvent)
    this.addEventListener(
      SetSignatureVisibilityEvent.key,
      this.handleSetSignatureVisibilityEvent
    )
    this.addEventListener(
      HideAllSignaturesEvent.key,
      this.handleHideAllSignaturesEvent
    )
    this.addEventListener(
      ShowAllSignaturesEvent.key,
      this.handleShowAllSignaturesEvent
    )
  }

  render() {
    return html`<h1>Signature Inspector</h1>
      <signature-loader-element></signature-loader-element>
      <signature-list-element></signature-list-element>
      <visualizer-element></visualizer-element>`
  }

  private handlePushSignatureEvent(e: PushSignatureEvent): void {
    this.signatures = [
      ...this.signatures,
      { signature: e.detail, visible: true },
    ]
  }

  private handleSetSignatureVisibilityEvent(
    e: SetSignatureVisibilityEvent
  ): void {
    const signature = this.signatures[e.detail.signatureIndex]
    signature.visible = e.detail.visibility
    this.signatures = [...this.signatures]
  }

  private handleHideAllSignaturesEvent(_e: HideAllSignaturesEvent): void {
    this.signatures.forEach((s) => (s.visible = false))
    this.signatures = [...this.signatures]
  }

  private handleShowAllSignaturesEvent(_e: HideAllSignaturesEvent): void {
    this.signatures.forEach((s) => (s.visible = true))
    this.signatures = [...this.signatures]
  }
}
