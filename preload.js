const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    onUpdateMessage:    (cb) => ipcRenderer.on('update-message',    (_e, m) => cb(m)),
    onUpdateProgress:   (cb) => ipcRenderer.on('update-progress',   (_e, p) => cb(p)),
    onUpdateDownloaded: (cb) => ipcRenderer.on('update-downloaded',  (_e, m) => cb(m)),
    getEnvConfig:       ()  => ipcRenderer.invoke('get-env-config'),

    // Stalker (sector: 'mmx' | 'am')
    getStalkerData:     (sector)  => ipcRenderer.invoke('stalker:get-data', sector),
    analyzeProduct:     (name, sector) => ipcRenderer.invoke('stalker:analyze-product', name, sector),
    stopAnalysis:       ()        => ipcRenderer.invoke('stalker:stop'),
    openMlLogin:        ()        => ipcRenderer.invoke('stalker:open-ml-login'),
    onMlLoginDone:      (cb) => ipcRenderer.on('stalker:ml-login-done', (_e) => cb()),
    getLinksData:       (sector)  => ipcRenderer.invoke('stalker:get-links', sector),
    updateLinkRow:      (data)    => ipcRenderer.invoke('stalker:update-link-row', data),
    insertLinks:        (data)    => ipcRenderer.invoke('stalker:insert-links', data),
    syncAllLinks:       (sector)  => ipcRenderer.invoke('stalker:sync-all-links', sector),
    checkForUpdates:    ()        => ipcRenderer.invoke('check-for-updates'),
    getVersion:         ()        => ipcRenderer.invoke('get-version'),

    // Lista de Precios MMX
    lpMmxGet:             ()     => ipcRenderer.invoke('lp-mmx:get'),
    lpMmxSetPrice:        (data) => ipcRenderer.invoke('lp-mmx:set-price', data),
    lpMmxSetMkpPrice:     (data) => ipcRenderer.invoke('lp-mmx:set-mkp-price', data),
    lpMmxSetSelPrice:     (data) => ipcRenderer.invoke('lp-mmx:set-sel-price', data),
    lpMmxGetRates:        ()     => ipcRenderer.invoke('lp-mmx:get-rates'),
    lpMmxSetRates:        (data) => ipcRenderer.invoke('lp-mmx:set-rates', data),
    lpMmxSetInternalRate: (data) => ipcRenderer.invoke('lp-mmx:set-internal-rate', data),
    lpMmxToggleStatus:    (data) => ipcRenderer.invoke('lp-mmx:toggle-status', data),

    // Inventario
    invGet:    (sector) => ipcRenderer.invoke('inventario:get', sector),
    invUpdate: (data)   => ipcRenderer.invoke('inventario:update', data),
    invAdd:    (data)   => ipcRenderer.invoke('inventario:add', data),
    invDelete: (data)   => ipcRenderer.invoke('inventario:delete', data),
    onStalkerProgress:  (cb) => ipcRenderer.on('stalker:progress',   (_e, d) => cb(d)),
    onStalkerLinkDone:  (cb) => ipcRenderer.on('stalker:link-done',  (_e, d) => cb(d)),
    onStalkerLinkError: (cb) => ipcRenderer.on('stalker:link-error', (_e, d) => cb(d)),
    
    // Registros
    registroAdd: (data) => ipcRenderer.invoke('registro:add', data),
    registroGetHistory: (data) => ipcRenderer.invoke('registro:get-history', data),

    // Ventas (POS)
    ventaAdd: (data) => ipcRenderer.invoke('venta:add', data),
    ventaGetHistory: () => ipcRenderer.invoke('venta:get-history'),
    clientesGet: () => ipcRenderer.invoke('clientes:get'),
    clientesAdd: (data) => ipcRenderer.invoke('clientes:add', data),
    clientesUpdate: (data) => ipcRenderer.invoke('clientes:update', data),
    imprimirFactura: (data) => ipcRenderer.invoke('factura:print-pdf', data),
});
