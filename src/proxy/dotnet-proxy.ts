// @ts-ignore
import { dotnet as dotnet_ } from '../../verifier/Verifier/bin/Release/net8.0/browser-wasm/AppBundle/_framework/dotnet'
import { type DotnetHostBuilder } from '../../verifier/Verifier/bin/Release/net8.0/browser-wasm/'
import { type DotnetAssemblyExports } from './dotnet-assembly-exports.ts'
import { VerifierProxy } from './verifier-proxy.ts'

export const dotnet: DotnetHostBuilder = dotnet_

export class DotnetProxy {
  private static readonly _instance: DotnetProxy = new DotnetProxy();
  static get instance(): DotnetProxy {
    return this._instance
  }

  private readonly _assemblyExports: Promise<DotnetAssemblyExports>

  private readonly _verifierProxy: Promise<VerifierProxy>
  public get verifierProxy(): Promise<VerifierProxy> {
    return this._verifierProxy
  }

  private constructor() {
    this._assemblyExports = this.initializeAssemblyExports()
    this._verifierProxy = this._assemblyExports.then(a => a.Verifier.VerifierExport)
  }

  private async initializeAssemblyExports(): Promise<DotnetAssemblyExports> {
    const is_browser = typeof window != 'undefined'
    if (!is_browser) throw new Error('Expected to be running in a browser')

    const { getAssemblyExports, getConfig } = await dotnet.create()
    const config = getConfig()
    return await getAssemblyExports(config.mainAssemblyName!)
  }
}
