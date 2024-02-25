import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@/components/ui/pagination';
import { PaginationMeta } from '@/types';
import { Link, useLocation } from 'react-router-dom';

interface PostPaginationProps {
  data: PaginationMeta;
}
export function PostPagination({ data }: PostPaginationProps) {
  const location = useLocation();

  const firstPage = 1;
  // calculate the next page
  const nextPage = Math.min(data.currentPage + 1, data.totalPages);
  // calculate the previous page
  const prevPage = Math.max(data.currentPage - 1, firstPage);

  const getParams = (page: number) => {
    const searchParams = new URLSearchParams(location.search);
    const searchObject = Object.fromEntries(Array.from(searchParams.entries()));
    const newParams: Record<string, string> = {
      ...searchObject,
      page: page.toString(),
    };

    return `?${new URLSearchParams(newParams).toString()}`;
  };

  return (
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <Button variant="outline" asChild>
            <Link
              to={{
                pathname: location.pathname,
                search: getParams(prevPage),
              }}
            >
              Previous
            </Link>
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button variant="outline" asChild>
            <Link
              to={{
                pathname: location.pathname,
                search: getParams(nextPage),
              }}
            >
              Next
            </Link>
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
