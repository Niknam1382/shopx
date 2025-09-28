def evaluate_condition(feature_conf, context=None):
    return bool(feature_conf.get('enabled', False))