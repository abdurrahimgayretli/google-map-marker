

export interface ContextClickData {
    clicks: google.maps.LatLng, e: google.maps.MapMouseEvent, center: google.maps.LatLngLiteral, m: google.maps.LatLngLiteral
}

export type ContextDataType = {
    clicks: ContextClickData.clicks,
    center: ContextClickData.center

    onClick: (e: ContextClickData.e) => void
    onForm: (e: ContextClickData.clicks) => void

    changeCenter: (m: ContextClickData.m) => void
}