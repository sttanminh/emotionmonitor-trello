## Post a submission
Post all data related to a submission

```http
POST /api/submission
```
### URL parameters
None
### Request body
```typescript
{
  "reflection": string
  "timestamp": Date
  "userId": string
  "trelloCardId": string
  "ratings": {
    emoScore: number,
    level: number,
    levelId: string,
    metricId: string
  } []
}
```

## Responses
### Status Codes

| Status Code | Description |
| :--- | :--- |
| 200 | `OK` |

### Response body
```javascript
{
  "message": "Submission inserted!"
}
```
### Status Codes

| Status Code | Description |
| :--- | :--- |
| 500 | `INTERNAL SERVER ERROR` |

### Response body
```javascript
{
  "message": "Internal server error"
}
```
