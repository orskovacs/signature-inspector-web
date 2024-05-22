import { LitElement, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { ref } from 'lit/directives/ref.js'
import {
  SignatureData,
  signaturesContext,
} from '../contexts/signatures.context'
import { consume } from '@lit/context'
import { setupSignatureFeatureChart } from '../utils/chart.util'
import { SignatureDataPoint } from 'signature-field'

@customElement('graph-element')
export class GraphElement extends LitElement {
  static styles = css`
    :host,
    .chart-wrapper {
      width: 100%;
      height: 100%;
    }
  `

  constructor() {
    super()
    this.addEventListener('dblclick', this.handleDoubleClick)
  }

  @property({ type: String })
  public feature!: keyof SignatureDataPoint

  @consume({ context: signaturesContext, subscribe: true })
  private signatures!: SignatureData[]

  @state()
  private normalizeData: boolean = false

  render() {
    return html`<div
      class="chart-wrapper"
      ${setupChart(
        this.signatures.filter((s) => s.visible),
        this.feature,
        this.normalizeData
      )}
    ></div>`
  }

  private handleDoubleClick() {
    this.normalizeData = !this.normalizeData
  }
}

function setupChart(
  signatures: SignatureData[],
  feature: keyof SignatureDataPoint,
  normalizeData: boolean
) {
  return ref((element) => {
    if (!element) {
      return
    }

    setupSignatureFeatureChart(element, signatures, feature, normalizeData)
  })
}
