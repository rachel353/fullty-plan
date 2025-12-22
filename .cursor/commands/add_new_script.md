## Add New Meeting Script

```
Add new meeting script for client [CLIENT_NAME] with meeting date [MM.DD] from attached file
```

**Process:**
1. Read the attached meeting script file
2. Execute `add_new_client` command: `Add a new client named [CLIENT_NAME] with the current year and month.` (if client folder does not exist)
3. Create `meeting_scripts/[MM.DD]/` folder structure
4. Copy the attached file to `script.md` using terminal copy command (e.g., `cp` or `copy`). Never print all file content. Use terminal script to copy the file directly.
5. Execute `process_meeting/main` command: `Process meeting script for client [CLIENT_NAME] with meeting date [MM.DD]`

**Prerequisites:**
- Attached file must contain the meeting script content
- Client name and meeting date must be provided

**Example:**
```
Add new meeting script for client 카카오 with meeting date 12.05 from attached file
```

---

## Detailed Steps

### Phase 1: Read Attached File 📄
- [ ] Verify attached file exists
- [ ] Read the complete content of the attached file
- [ ] Validate that content is not empty

### Phase 2: Create Client Structure 🏢
- [ ] Get client name from user input or attached file
- [ ] Check if client folder already exists (format: `YY_MM_CLIENT_NAME/`)
- [ ] If folder does NOT exist, execute `add_new_client` command:
  ```
  Add a new client named [CLIENT_NAME] with the current year and month.
  ```
- [ ] If client folder already exists, skip to Phase 3

### Phase 3: Create Meeting Script Folder 📁
- [ ] Get meeting date (`MM.DD` format) from user input
- [ ] Create folder: `YY_MM_CLIENT_NAME/meeting_scripts/[MM.DD]/`
- [ ] If folder already exists, it will be used (no error)

### Phase 4: Save Script File 💾
- [ ] Use terminal copy command to copy the attached file
- [ ] Copy to destination: `YY_MM_CLIENT_NAME/meeting_scripts/[MM.DD]/script.md`
- [ ] Use terminal script (e.g., `cp [source] [destination]` or `copy [source] [destination]`)
- [ ] Verify file is created successfully
- [ ] If `script.md` already exists, it will be overwritten

### Phase 5: Process Meeting Script 🔄
- [ ] **Execute `process_meeting/main` command explicitly:**
  ```
  Process meeting script for client [CLIENT_NAME] with meeting date [MM.DD]
  ```

---

## Task Flow

```
Attached File
    ↓
Read Content
    ↓
Get Client Name & Meeting Date (MM.DD)
    ↓
Execute: add_new_client command
  "Add a new client named [CLIENT_NAME] with the current year and month."
    ↓
Create: meeting_scripts/[MM.DD]/ folder
    ↓
Copy attached file to script.md using terminal copy command
    ↓
Execute: process_meeting/main command
  "Process meeting script for client [CLIENT_NAME] with meeting date [MM.DD]"
```

---

## Important Notes

- ⚠️ **Attached file is required** - The script content must be attached to the message
- ⚠️ **Client name format** - Use the actual company name (e.g., "카카오", "세빛넥스")
- ⚠️ **Date format** - Must be `MM.DD` format (e.g., "12.05", "11.06")
- ✅ **Automatic processing** - After saving `script.md`, automatically executes `process_meeting/main` command to process the script
- ✅ **process_meeting/main command** - Executes the `process_meeting/main` command to process the meeting script
- ✅ **add_new_client command** - Uses the `add_new_client` command to create client folder structure (if not exists)
- ✅ **Terminal copy** - Uses terminal copy command (e.g., `cp` or `copy`) to copy the attached file to `script.md`
- ✅ **Idempotent** - Can be run multiple times safely (overwrites existing files)
- ✅ **Quote generation** - Automatically decides if quote generation is needed based on meeting content

---

## Complete Example Workflow

**User provides:**
- Attached file: `meeting_transcript_20251205.txt` (contains meeting script)
- Client name: `카카오`
- Meeting date: `12.05`

**Command execution:**
```
Add new meeting script for client 카카오 with meeting date 12.05 from attached file
```

**Result:**
1. ✅ Executes `add_new_client` command: `Add a new client named 카카오 with the current year and month.`
2. ✅ Creates folder: `25_12_카카오/meeting_scripts/12.05/`
3. ✅ Copies attached file to: `25_12_카카오/meeting_scripts/12.05/script.md` using terminal copy command
4. ✅ Executes `process_meeting/main` command: `Process meeting script for client 카카오 with meeting date 12.05`

---

## Error Handling

**No attached file:**
- Prompt user to attach the meeting script file

**Invalid date format:**
- Prompt user to provide date in `MM.DD` format

**Empty file:**
- Prompt user to verify the attached file contains content

**Client folder creation fails:**
- Show error message and stop execution

---

## Alternative Usage

If the client folder already exists:

```
Add new meeting script for client 세빛넥스 with meeting date 12.10 from attached file
```

This will:
1. ✅ Check if folder exists: `25_10_세빛넥스/`
2. ✅ Skip `add_new_client` command execution (folder already exists)
3. ✅ Creates folder: `25_10_세빛넥스/meeting_scripts/12.10/`
4. ✅ Copies attached file to: `25_10_세빛넥스/meeting_scripts/12.10/script.md` using terminal copy command
5. ✅ Execute `process_meeting/main` command: `Process meeting script for client 세빛넥스 with meeting date 12.10`

---

