"""Loads the safe, frontend-facing prediction model configuration."""

import json
from pathlib import Path


CONFIG_PATH = Path(__file__).resolve().parent.parent / "config" / "model_config.json"


def get_model_configurations() -> list[dict]:
    """Return public model metadata without exposing internal implementation details."""
    with CONFIG_PATH.open(encoding="utf-8") as config_file:
        configured_models = json.load(config_file).get("models", {})

    models = []
    for key, model in configured_models.items():
        models.append(
            {
                "key": key,
                "model_name": model["model_name"],
                "description": model.get("description", ""),
                # The frontend needs the route to submit the selected form. These
                # are public API routes, not internal file paths or secrets.
                "endpoint": model["endpoint"],
                "method": model.get("method", "POST"),
                "fields": model.get("fields", []),
            }
        )
    return models
