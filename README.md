Work inside:

C:\Users\ak54743\Downloads\OneDrive_2026-07-16\Rapid Portfolio Review_AI

Do not change application behavior and do not create or configure any Stylus preset.

I need you to generate the two knowledge files that I will manually upload into my Stylus preset.

Create this folder:

preset_knowledge

Create these files inside it:

1. `preset_knowledge\Step25Assessment.schema.json`
2. `preset_knowledge\RPR_STEP25_FIELD_DICTIONARY.md`

For `Step25Assessment.schema.json`:

* Find the actual Pydantic response model used by the active Step 2.5 Run Assessment endpoint.
* Trace the active route, response model, persistence model and frontend response consumption.
* Do not invent a new schema.
* Export the schema directly from the actual Pydantic model.
* Use `model_json_schema()` for Pydantic v2 or `schema()` for Pydantic v1.
* Preserve nested definitions, required fields, enums and nullable fields.
* Save valid, formatted JSON.
* Confirm that Python can parse the generated JSON file.
* Report the exact Python model and source file from which it was generated.

If there are multiple Step 2.5 models, identify which one is the final model returned by the active `/run` endpoint. Generate the schema from that model.

For `RPR_STEP25_FIELD_DICTIONARY.md`, document from the actual code:

* Step 2.2 company and portfolio fields;
* Step 2.3 event-driven factor fields;
* Step 2.4 sector-inherent factor fields;
* Step 2.5 output fields;
* which fields are authoritative inputs;
* which fields are deterministic calculations;
* which fields are evidence/model outputs;
* ED, SI and composite-score ownership;
* evidence-record structure;
* allowed recommendation values;
* meanings of `Not assessed`, `Not supplied`, `Insufficient evidence` and `Identity review required`;
* mapping between Step 2.5 schema fields and v31 table columns.

Do not include credentials, tokens, real company data or prewritten assessment results.

After creating the files:

1. Validate that both files exist.
2. Print their exact full Windows paths.
3. Show their file sizes.
4. Confirm that the JSON is syntactically valid.
5. Briefly explain which backend files were used as the sources.
6. Do not modify any other file.
