import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ref } from 'lit/directives/ref.js'
import {
  SignatureData,
  signaturesContext,
} from '../contexts/signatures.context'
import { consume } from '@lit/context'
import { setupSignatureFeatureChart } from '../utils/chart.util'
import { SignatureDataPoint } from 'signature-field'
import { normalizeDataContext } from '../contexts/normalize-data.context'

@customElement('graph-element')
export class GraphElement extends LitElement {
  static styles = css`
    :host,
    .chart-wrapper {
      width: 100%;
      height: 100%;
    }
  `

  @property({ type: String })
  public feature!: keyof SignatureDataPoint

  @consume({ context: signaturesContext, subscribe: true })
  private signatures!: SignatureData[]

  @consume({ context: normalizeDataContext, subscribe: true })
  public normalizeData!: boolean

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
