def get_setting(request, key, default=None):
    t = getattr(request,'tenant',None)
    s = getattr(t,'settings',None) if t else None
    return s.values.get(key, default) if s else default

def feature_enabled(request, key, context=None):
    t = getattr(request,'tenant',None)
    s = getattr(t,'settings',None) if t else None
    f = s.features.get(key) if s else None
    return bool(f and f.get('enabled', False))