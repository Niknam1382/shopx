def site_settings(request):
    t = getattr(request,'tenant',None)
    s = getattr(t,'settings',None) if t else None
    return {
        'tenant': t,
        'site_settings': s.values if s else {},
        'theme_tokens': s.theme_tokens if s else {},
        'features': s.features if s else {},
    }