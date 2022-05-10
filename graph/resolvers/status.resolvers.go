package resolvers

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
)

func (r *queryResolver) Status(ctx context.Context) (string, error) {
	return "Hello", nil
}
